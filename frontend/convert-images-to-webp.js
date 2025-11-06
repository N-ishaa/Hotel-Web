import imagemin from "imagemin";
import imageminWebp from "imagemin-webp";
import imageminMozjpeg from "imagemin-mozjpeg";
import imageminPngquant from "imagemin-pngquant";

(async () => {
  await imagemin(["src/assets/*.{jpg,jpeg,png}"], {
  destination: "src/assets/webp",
    plugins: [
      imageminMozjpeg({ quality: 80 }),
      imageminPngquant({ quality: [0.6, 0.8] }),
      imageminWebp({ quality: 80 }),
    ],
  });

  console.log("✅ All images converted to WebP and saved in /public/images/webp/");
})();
