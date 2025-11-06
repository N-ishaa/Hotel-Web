import imagemin from "imagemin";
import imageminMozjpeg from "imagemin-mozjpeg";
import imageminWebp from "imagemin-webp";

(async () => {
  await imagemin(["src/assets/*.{jpg,png}"], {
    destination: "src/assets/optimized",
    plugins: [
      imageminMozjpeg({ quality: 75 }),
      imageminWebp({ quality: 75 }),
    ],
  });
  console.log("✅ Images optimized and saved in src/assets/optimized/");
})();
