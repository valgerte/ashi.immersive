const qs = (s) => document.querySelector(s);
const qsa = (s) => document.querySelectorAll(s);

const actionButton = qs(".action-button");
const restartButton = qs(".restart-button");

const personImage = qs(".person-image");
const mainBg = qs(".main-bg");
// const mainSphere = qs(".main-sphere");
// const floating = qs(".bg-floating");
// const floatingOffset = qs(".bg-floating-offset");

const pulse = qs(".pulse-image");
const fly = qs(".fly-image");

const floatingSpheres = qs(".floating-spheres");
const spheres = qsa(".floating-sphere-wrapper");

const bgReveal = qs(".bg-reveal");
const bgOverlay = qs(".bg-overlay");
const bgOverlay2 = qs(".bg-overlay2");

const flash = qs(".flash-overlay");

document.addEventListener("app:ready", () => {
  actionButton.classList.add("visible");
});

let currentStep = 0;
let enabled = false;

/* =========================
   СЦЕНЫ
========================= */

const SCENES = [
  {
    bg: "images/earthBg.png",
    human: "images/gradientGreenHuman.webp",
    class: "person-green",
    rotate: "-80deg",
    translate: "0 -10vh",
    pulse: "images/grassWrapper.webp",
    fly: "images/greenGrass.webp",
    floating: "images/greenRock.webp",
    floatingOpacity: 0.2,
    flyBlendMode: "screen",
    flyOpacity: 0.66,
    pulseBlend: "screen",
  },
  {
    bg: "images/waterBg.png",
    human: "images/waterHuman.webp",
    class: "person-blue",
    rotate: "0deg",
    translate: "0 10vh",
    pulse: "images/blueWater2.webp",
    fly: "images/blueWater3.png",
    floating: "images/lotusPool.webp",
    floatingOffsetY: "50%",
    flyBlendMode: "hard-light",
    flyOpacity: 0.8,
    pulseBlend: "normal",
  },
  {
    bg: "images/fireBackground.webp",
    human: "images/fireHuman.webp",
    class: "person-red",
    rotate: "20deg",
    translate: "0 -10vh",
    pulse: "images/lavaBig.webp",
    fly: "images/lavaLamp.png",
    floating: null,
    flyBlendMode: "overlay",
    flyOpacity: 0.48,
    pulseBlend: "overlay",
  },
  {
    bg: "images/cloudBg.png",
    human: "images/airHuman.webp",
    class: "person-air",
    rotate: "0deg",
    translate: "0",
    pulse: "images/whiteClouds.webp",
    fly: "images/rotatedClouds.png",
    floating: "images/floatingClouds.webp",
    floatingOpacity: 0.3,
    flyOpacity: 0.8,
    pulseBlend: "soft-light",
  },
];

/* =========================
   СТАРТ
========================= */

actionButton.addEventListener("pointerup", () => {
  playFlash(() => {
    actionButton.style.display = "none";

    personImage.classList.add("active");

    enabled = true;
    currentStep = 0;

    spheres.forEach((sphere) => {
      sphere.classList.remove("active");
      sphere.style.pointerEvents = "none";
    });

    spheres[0].classList.add("active", "waiting");
    spheres[0].style.pointerEvents = "auto";
  });
});

/* =========================
   ЛОГИКА СФЕР
========================= */

spheres.forEach((sphere, index) => {
  sphere.addEventListener("pointerup", () => {
    if (!enabled || index !== currentStep) return;

    sphere.classList.remove("waiting");
    activateScene(index, sphere);
  });
});

function activateScene(index, sphere) {
  const scene = SCENES[index];

  playFlash(() => {
    floatingSpheres.classList.add("flying");
    floatingSpheres.classList.remove(`step${index}`);
    floatingSpheres.classList.add(`step${index + 1}`);

    sphere.classList.add("to-person");

    qs(".person-float").classList.add("active");

    if (index === 0) {
      // mainSphere.style.display = "none";

      personImage.classList.remove("active");
      personImage.classList.add("fixed", scene.class);
      personImage.style.opacity = "1";
      personImage.style.rotate = scene.rotate;
      personImage.style.translate = scene.translate;
      personImage.src = scene.human;
    } else {
      personImage.src = scene.human;
      personImage.className = `person-image fixed ${scene.class}`;
      personImage.style.rotate = scene.rotate;
      personImage.style.translate = scene.translate;
      personImage.style.opacity = "1";
    }

    mainBg.src = scene.bg;

    // if (scene.floating) {
    //   floating.style.display = "block";
    //   floating.src = scene.floating;
    //   floating.classList.add("visible");
    //   floating.classList.remove("fixed");

    //   floating.style.opacity =
    //     scene.floatingOpacity !== undefined ? scene.floatingOpacity : "1";

    //   floatingOffset.style.setProperty(
    //     "--offsetY",
    //     scene.floatingOffsetY || "0%",
    //   );
    // } else {
    //   floating.style.display = "none";
    // }
  });

  playEnergy(scene, () => {
    sphere.classList.add("used");
    currentStep++;

    if (currentStep < spheres.length) {
      spheres[currentStep].classList.add("active", "waiting");
      spheres[currentStep].style.pointerEvents = "auto";
    } else {
      endScene();
    }
  });
}

/* =========================
   ЭНЕРГИЯ
========================= */

function playEnergy(scene, onFinish) {
  pulse.src = scene.pulse;
  fly.src = scene.fly;

  fly.style.mixBlendMode = scene.flyBlendMode || "normal";
  pulse.style.mixBlendMode = scene.pulseBlend || "normal";

  pulse.classList.remove("fade-out", "active");
  fly.classList.remove("fly-out", "active");
  qs(".bg-float").classList.add("active");


  setTimeout(() => pulse.classList.add("active"), 1200);
  setTimeout(() => fly.classList.add("active"), 800);

  setTimeout(() => {
    pulse.classList.add("fade-out");
    fly.classList.add("fly-out");
    // floating.classList.add("fixed");
    qs(".person-float").classList.remove("active");
    qs(".bg-float").classList.remove("active");
    onFinish();
  }, 6000);
}

/* =========================
   ФИНАЛ
========================= */

function endScene() {
  personImage.style.display = "none";
  floatingSpheres.style.display = "none";
  // floating.classList.remove("visible");

  setTimeout(() => bgReveal.classList.add("active"), 200);
  setTimeout(() => bgOverlay.classList.add("active"), 1200);
  setTimeout(() => bgOverlay2.classList.add("active"), 2200);
  setTimeout(() => restartButton.classList.add("active"), 3200);
}

restartButton.addEventListener("pointerup", () => {
  location.reload();
});

/* =========================
   ВСПЫШКА
========================= */

function playFlash(fn) {
  flash.classList.add("active");

  setTimeout(fn, 150);

  flash.addEventListener(
    "animationend",
    () => flash.classList.remove("active"),
    { once: true },
  );
}
