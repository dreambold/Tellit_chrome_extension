<?php require('connect.php'); ?>
<!DOCTYPE html>
<html lang="en">

<head>
  <meta charset="UTF-8">
  <title>Unsubscribe!</title>
</head>

<body>
  <style>
    body {
      background: #f7f7f7;
    }

    .wrapper {
      width: 50%;
      margin: 20px auto;
      background: #fff;
      padding: 10%;
      border-radius: 10px;
      box-shadow: 0 0 10px 0 rgba(0, 0, 0, .2);
    }

    .wrapper input {
      width: 100%;
      border: 1px solid #afafaf;
      padding: 2.5% 0;
      border-radius: 4px;
      margin-bottom: 20px;
    }

    .image-upload {
      visibility: hidden;
      width: 0;
      height: 0
    }
  </style>
  <?php if (!isset($_POST['promote'])) { ?>
    <form class="wrapper" method="post" enctype="multipart/form-data">
      <fieldset>
        <h2>Input validate infos to promote an ad</h2>
        <input name="email" type="email" placeholder="Enter your email address here" required>
        <input type="text" name="name" placeholder="Name" />
        <input type="text" name="link" placeholder="Ad Link" />
        <label for="file-input"> Browse For File!
          <img src="ads/dd_dfd_1576078675Jenia Kujnezov.png" height="20" width="100%" style="border-radius: 5px;" />
        </label>
        <input class="image-upload" id="file-input" type="file" name="image" style="display: none;" />
        <!-- style="background-image: url('ads/dd_dfd_1576078675Jenia Kujnezov.png');"-->
        <textarea name=" forbidden_links" style="width: 100%;" rows="5" placeholder="Input Forbidden Links. (One Per Line)"></textarea>
        <input type="submit" name="promote" class="submit" value="Promote" />
      </fieldset>
    </form>
  <?php } else {

    function compress($source, $destination, $quality)
    {
      $info = getimagesize($source);
      list($width, $height) = getimagesize($source);
      if ($info['mime'] == 'image/jpeg')
        $image = imagecreatefromjpeg($source);

      elseif ($info['mime'] == 'image/gif')
        $image = imagecreatefromgif($source);

      elseif ($info['mime'] == 'image/png')
        $image = imagecreatefrompng($source);

      $imagetruecolor = imagecreatetruecolor($width, $height);

      imagecopyresampled($imagetruecolor, $image, 0, 0, 0, 0, $width, $height, $width, $height);
      imagejpeg($imagetruecolor, $destination, $quality);
      return $destination;
    }
    if (isset($_POST['promote'])) {
      $image = $_FILES['image']['name'];
      $allowed = ',png,jpg,gif,jfif,jpeg';
      $extension_allowed =  explode(',', $allowed);
      $file_extension =  pathinfo($image, PATHINFO_EXTENSION);

      if (array_search($file_extension, $extension_allowed)) {
        if (is_uploaded_file($_FILES['image']['tmp_name'])) {
          $source_img = $_FILES['image']['tmp_name'];
          $destination_img = "ads/" . preg_replace('/\s+/', '_', strtolower($_POST['name'])) . "_" . time() . $_FILES['image']['name'];
          if (compress($source_img, $destination_img, 50)) {
            unlink($source_img);
            $email = mysqli_real_escape_string($conn, $_POST['email']);
            $name = mysqli_real_escape_string($conn, $_POST['name']);
            $link = mysqli_real_escape_string($conn, $_POST['link']);
            if (mysqli_query($conn, "INSERT INTO ads(name, email, ad_link, image)VALUES('$name','$email','$link','$destination_img')")) {
              $id = mysqli_insert_id($conn);
              echo "Promoted Successfully! <a style='cursor: pointer;' onclick='history.back()'>Back</a>";
            }
            $forbidden_links = explode("\r\n", $_POST['forbidden_links']);
            if (isset($id)) {
              foreach ($forbidden_links as $forbidden_link) {
                if (!empty($forbidden_link)) {
                  $query = mysqli_query($conn, "INSERT INTO forbidden_links(ad_id, link) VALUES('$id','$forbidden_link')");
                }
              }
            }
          }
        } else {
          echo "Something went wrong";
        }
      } else {
        echo '

                  <div class="row">
                    <div class="col-lg-12">
                      <section class="panel">
                        <header class="panel-heading" style="color: red">
                          Warning !!!
                        </header>
                        <div class="panel-body">
                          This types of image are not accepted.
                        </div>
                      </section>
                    </div>
                  </div>
            ';
        die();
      }
    }
  } ?>
</body>

</html>