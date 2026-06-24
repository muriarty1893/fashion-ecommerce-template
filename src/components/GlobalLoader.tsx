"use client";

import Script from "next/script";
import { useEffect, useRef } from "react";

const CONFIG = {
  textColor: "#000000",
  bgColor: "#f5f5f5",
  globe1Text: "MODE     FASHION     >     CURATED     STYLE     &     COMMERCE     ",
  globe1Font: "Sofia Sans Condensed",
  globe1Weight: 900,
  globe1HeightScale: 1.45,
  globe1Y: 0.35,
  globe2Text:
    "NEW ARRIVALS       ●       BEST SELLERS       ●       SEASONAL LOOKS       ●       MODE       ●      ",
  globe2Font: "Spline Sans Mono",
  globe2Weight: 300,
  globe2HeightScale: 1,
  globe2Dot: "●",
  globe2DotScale: 0.65,
  globe2Y: -0.15,
  radius: 1.5,
  loaderY: 0,
  tilt: 0.13,
  parallax: 0.4,
  globe1Speed: 0.0004,
  globe2Speed: 0.0008,
  showOncePerSession: true,
  minDuration: 5000,
  fadeDuration: 1400,
  enterDuration: 2500,
  exitDuration: 1300,
  progressTickMs: 60,
  progressStepReady: 8,
  progressStepWaiting: 1.4,
  maxProgressBeforeLoad: 95,
} as const;

const SESSION_KEY = "modeFashionLoaderShown";

type LoaderRuntime = {
  startScene: () => void;
  dispose: () => void;
};

const GlobalLoader = () => {
  const loaderRef = useRef<HTMLDivElement | null>(null);
  const stageRef = useRef<HTMLDivElement | null>(null);
  const counterRef = useRef<HTMLDivElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const runtimeRef = useRef<LoaderRuntime | null>(null);
  const threeReadyRef = useRef(false);

  useEffect(() => {
    const loaderEl = loaderRef.current;
    const stageEl = stageRef.current;
    const counterEl = counterRef.current;
    const canvasEl = canvasRef.current;

    if (!loaderEl || !stageEl || !counterEl || !canvasEl) {
      return undefined;
    }

    if (document.documentElement.classList.contains("site-loader-should-skip")) {
      loaderEl.style.display = "none";
      return undefined;
    }

    const body = document.body;
    const previousOverflow = body.style.overflow;
    const windowWithThree = window as Window & { THREE?: any };

    let hidden = false;
    let disposed = false;
    let animationId = 0;
    let progressTimer = 0;
    let hideTimer = 0;
    let progress = 0;
    let startedAt = Date.now();
    let pageDone = document.readyState === "complete";
    let fontsDone = !document.fonts;
    let sceneReady = false;
    let introStarted = false;
    let exitStarted = false;
    let globe1: any = null;
    let globe2: any = null;
    let mouse = { x: 0, y: 0 };
    let target = { x: 0, y: 0 };

    const sceneState = {
      scene: null as any,
      camera: null as any,
      renderer: null as any,
      loaderGroup: null as any,
    };

    const stopTimers = () => {
      window.clearTimeout(progressTimer);
      window.clearTimeout(hideTimer);
      window.cancelAnimationFrame(animationId);
    };

    const lerp = (from: number, to: number, progressValue: number) =>
      from + (to - from) * progressValue;

    const easeOutCubic = (value: number) => 1 - (1 - value) ** 3;
    const easeInCubic = (value: number) => value ** 3;
    const easeLinear = (value: number) => value;

    const tween = (
      duration: number,
      onUpdate: (progressValue: number) => void,
      options?: {
        delay?: number;
        ease?: (value: number) => number;
        onComplete?: () => void;
      },
    ) => {
      const startedAt = performance.now();
      const delay = options?.delay ?? 0;
      const ease = options?.ease ?? easeLinear;

      const step = (now: number) => {
        if (disposed) {
          return;
        }

        const elapsed = now - startedAt;
        if (elapsed < delay) {
          window.requestAnimationFrame(step);
          return;
        }

        const rawProgress = Math.min((elapsed - delay) / duration, 1);
        onUpdate(ease(rawProgress));

        if (rawProgress < 1) {
          window.requestAnimationFrame(step);
          return;
        }

        options?.onComplete?.();
      };

      window.requestAnimationFrame(step);
    };

    const revealLoader = () => {
      window.requestAnimationFrame(() => {
        if (!disposed) {
          loaderEl.classList.add("site-loader--ready");
        }
      });
    };

    const startIntroAnimation = () => {
      if (introStarted || disposed || !globe1 || !globe2) {
        return;
      }

      introStarted = true;

      const globe1Start = { x: 1.5, y: -15 };
      const globe1End = { x: 0, y: CONFIG.globe1Y };
      const globe2Start = { x: -1.5, y: -15 };
      const globe2End = { x: 0, y: CONFIG.globe2Y };

      globe1.position.set(globe1Start.x, globe1Start.y, 0);
      globe2.position.set(globe2Start.x, globe2Start.y, 0);
      revealLoader();

      tween(
        CONFIG.enterDuration,
        (progressValue) => {
          globe1.position.x = lerp(globe1Start.x, globe1End.x, progressValue);
          globe1.position.y = lerp(globe1Start.y, globe1End.y, progressValue);
        },
        { delay: 200, ease: easeOutCubic },
      );

      tween(
        1800,
        (progressValue) => {
          globe2.position.x = lerp(globe2Start.x, globe2End.x, progressValue);
          globe2.position.y = lerp(globe2Start.y, globe2End.y, progressValue);
        },
        { delay: 700, ease: easeOutCubic },
      );
    };

    const startExitAnimation = () => {
      if (exitStarted || disposed || !globe1 || !globe2) {
        return;
      }

      exitStarted = true;
      markLoaderSeen();
      loaderEl.classList.add("site-loader--exiting");
      loaderEl.classList.remove("site-loader--ready");

      const globe1Start = { x: globe1.position.x, y: globe1.position.y };
      const globe2Start = { x: globe2.position.x, y: globe2.position.y };
      const globe1End = { x: 1.5, y: -15 };
      const globe2End = { x: -1.5, y: -15 };

      tween(
        CONFIG.exitDuration,
        (progressValue) => {
          globe1.position.x = lerp(globe1Start.x, globe1End.x, progressValue);
          globe1.position.y = lerp(globe1Start.y, globe1End.y, progressValue);
        },
        { ease: easeInCubic },
      );

      tween(
        1000,
        (progressValue) => {
          globe2.position.x = lerp(globe2Start.x, globe2End.x, progressValue);
          globe2.position.y = lerp(globe2Start.y, globe2End.y, progressValue);
        },
        { delay: 50, ease: easeInCubic },
      );
    };

    const markLoaderSeen = () => {
      try {
        sessionStorage.setItem(SESSION_KEY, "true");
        document.documentElement.classList.add("site-loader-should-skip");
      } catch {
        // Session storage may be unavailable in private or hardened modes.
      }
    };

    const disposeLoader = () => {
      if (sceneState.loaderGroup) {
        sceneState.loaderGroup.traverse((object: any) => {
          if (object.geometry) {
            object.geometry.dispose();
          }

          if (object.material) {
            if (object.material.map) {
              object.material.map.dispose();
            }

            object.material.dispose();
          }
        });
      }

      sceneState.renderer?.dispose();
      sceneState.scene = null;
      sceneState.camera = null;
      sceneState.renderer = null;
      sceneState.loaderGroup = null;
      globe1 = null;
      globe2 = null;
      sceneReady = false;
    };

    const hideLoader = () => {
      if (hidden || disposed) {
        return;
      }

      hidden = true;
      stopTimers();
      startExitAnimation();

      hideTimer = window.setTimeout(() => {
        if (disposed) {
          return;
        }

        loaderEl.style.display = "none";
        body.classList.remove("site-loader-active");
        body.style.overflow = previousOverflow;
        disposeLoader();
      }, CONFIG.fadeDuration);
    };

    const canFinish = () =>
      pageDone &&
      fontsDone &&
      threeReadyRef.current &&
      Date.now() - startedAt >= CONFIG.minDuration;

    const tickProgress = () => {
      if (hidden || disposed) {
        return;
      }

      progress += canFinish() ? CONFIG.progressStepReady : CONFIG.progressStepWaiting;
      progress = Math.min(
        progress,
        canFinish() ? 100 : CONFIG.maxProgressBeforeLoad,
      );
      counterEl.textContent = `${Math.round(progress)}%`;

      if (progress >= 100) {
        hideLoader();
      } else {
        progressTimer = window.setTimeout(tickProgress, CONFIG.progressTickMs);
      }
    };

    const drawScaledText = (
      context: CanvasRenderingContext2D,
      text: string,
      x: number,
      y: number,
      heightScale: number,
    ) => {
      context.save();
      context.translate(x, y);
      context.scale(1, heightScale);
      context.strokeText(text, 0, 0);
      context.fillText(text, 0, 0);
      context.restore();
    };

    const drawTextWithScaledDots = (
      context: CanvasRenderingContext2D,
      text: string,
      canvas: HTMLCanvasElement,
      finalSize: number,
      heightScale: number,
      fontWeight: number,
      fontFamily: string,
      dotGlyph: string,
      dotScale: number,
    ) => {
      const segments = text.split(dotGlyph);
      let x = canvas.width / 2 - context.measureText(text).width / 2;
      const y = canvas.height / 2;

      for (let index = 0; index < segments.length; index += 1) {
        context.font = `${fontWeight} ${finalSize}px "${fontFamily}", sans-serif`;
        drawScaledText(context, segments[index], x, y, heightScale);
        x += context.measureText(segments[index]).width;

        if (index < segments.length - 1) {
          context.font = `${fontWeight} ${finalSize * dotScale}px "${fontFamily}", sans-serif`;
          drawScaledText(context, dotGlyph, x, y, heightScale);
          x += context.measureText(dotGlyph).width;
        }
      }
    };

    const createTextTexture = (
      three: any,
      text: string,
      heightScale: number,
      fontWeight: number,
      fontFamily: string,
      dotGlyph?: string,
      dotScale?: number,
    ) => {
      const textureCanvas = document.createElement("canvas");
      const context = textureCanvas.getContext("2d");

      if (!context) {
        throw new Error("Loader canvas context unavailable");
      }

      textureCanvas.width = 8192;
      textureCanvas.height = 4096;

      const phrase = `${text} `;
      context.font = `${fontWeight} 100px "${fontFamily}", sans-serif`;
      const finalSize = 100 * (textureCanvas.width / context.measureText(phrase).width);
      context.fillStyle = CONFIG.textColor;
      context.strokeStyle = "rgba(255, 255, 255, 0.18)";
      context.lineWidth = finalSize * 0.018;
      context.lineJoin = "round";
      context.textBaseline = "middle";

      if (!dotGlyph) {
        context.font = `${fontWeight} ${finalSize}px "${fontFamily}", sans-serif`;
        context.textAlign = "center";
        drawScaledText(
          context,
          phrase,
          textureCanvas.width / 2,
          textureCanvas.height / 2,
          heightScale,
        );
      } else {
        drawTextWithScaledDots(
          context,
          phrase,
          textureCanvas,
          finalSize,
          heightScale,
          fontWeight,
          fontFamily,
          dotGlyph,
          dotScale ?? 1,
        );
      }

      const texture = new three.CanvasTexture(textureCanvas);
      texture.minFilter = three.LinearMipmapLinearFilter;
      texture.magFilter = three.LinearFilter;
      texture.wrapS = three.RepeatWrapping;
      texture.wrapT = three.ClampToEdgeWrapping;
      texture.anisotropy = sceneState.renderer?.capabilities.getMaxAnisotropy() ?? 1;
      texture.needsUpdate = true;
      return texture;
    };

    const createTextSphere = (
      three: any,
      text: string,
      heightScale: number,
      fontWeight: number,
      fontFamily: string,
      dotGlyph?: string,
      dotScale?: number,
    ) => {
      const group = new three.Group();
      const texture = createTextTexture(
        three,
        text,
        heightScale,
        fontWeight,
        fontFamily,
        dotGlyph,
        dotScale,
      );

      const material = new three.MeshBasicMaterial({
        map: texture,
        transparent: true,
        side: three.DoubleSide,
        depthWrite: false,
      });

      group.add(new three.Mesh(new three.SphereGeometry(CONFIG.radius, 64, 64), material));
      group.userData.tex = texture;
      return group;
    };

    const animate = () => {
      if (disposed || !sceneReady) {
        return;
      }

      animationId = window.requestAnimationFrame(animate);

      if (!globe1 || !globe2) {
        return;
      }

      globe1.userData.tex.offset.x += CONFIG.globe1Speed;
      globe2.userData.tex.offset.x += CONFIG.globe2Speed;
      target.x += (mouse.y * CONFIG.parallax - target.x) * 0.05;
      target.y += (mouse.x * CONFIG.parallax - target.y) * 0.05;
      sceneState.loaderGroup.rotation.x = CONFIG.tilt + target.x;
      sceneState.loaderGroup.rotation.y = target.y;
      sceneState.renderer.render(sceneState.scene, sceneState.camera);
    };

    const initScene = () => {
      if (sceneReady || disposed || !threeReadyRef.current || !fontsDone) {
        return;
      }

      const three = windowWithThree.THREE;
      if (!three) {
        return;
      }

      try {
        sceneState.scene = new three.Scene();
        sceneState.camera = new three.PerspectiveCamera(
          75,
          window.innerWidth / window.innerHeight,
          0.1,
          1000,
        );
        sceneState.renderer = new three.WebGLRenderer({
          canvas: canvasEl,
          antialias: true,
        });
        sceneState.loaderGroup = new three.Group();

        sceneState.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
        sceneState.renderer.setSize(window.innerWidth, window.innerHeight);
        sceneState.renderer.setClearColor(CONFIG.bgColor);
        sceneState.scene.add(new three.AmbientLight(0xffffff, 1));
        sceneState.scene.add(sceneState.loaderGroup);
        sceneState.camera.position.set(0, 0, 6);

        globe1 = createTextSphere(
          three,
          CONFIG.globe1Text,
          CONFIG.globe1HeightScale,
          CONFIG.globe1Weight,
          CONFIG.globe1Font,
        );
        globe2 = createTextSphere(
          three,
          CONFIG.globe2Text,
          CONFIG.globe2HeightScale,
          CONFIG.globe2Weight,
          CONFIG.globe2Font,
          CONFIG.globe2Dot,
          CONFIG.globe2DotScale,
        );

        globe1.position.set(0, CONFIG.globe1Y, 0);
        globe2.position.set(0, CONFIG.globe2Y, 0);
        globe1.userData.tex.offset.x = -25 / 64;
        sceneState.loaderGroup.position.y = CONFIG.loaderY;
        sceneState.loaderGroup.rotation.x = CONFIG.tilt;
        sceneState.loaderGroup.add(globe1, globe2);

        window.addEventListener("mousemove", handlePointerMove);
        window.addEventListener("resize", handleResize);
        sceneReady = true;
        animate();
        startIntroAnimation();
      } catch {
        disposeLoader();
      }
    };

    const handlePointerMove = (event: MouseEvent) => {
      mouse = {
        x: (event.clientX / window.innerWidth) * 2 - 1,
        y: (event.clientY / window.innerHeight) * 2 - 1,
      };
    };

    const handleResize = () => {
      if (!sceneReady) {
        return;
      }

      sceneState.camera.aspect = window.innerWidth / window.innerHeight;
      sceneState.camera.updateProjectionMatrix();
      sceneState.renderer.setSize(window.innerWidth, window.innerHeight);
    };

    const startLoader = () => {
      if (hidden || disposed) {
        return;
      }

      tickProgress();
    };

    const completePage = () => {
      pageDone = true;
    };

    const completeFonts = () => {
      const loadFontFaces = async () => {
        try {
          await Promise.all([
            document.fonts?.load('900 100px "Sofia Sans Condensed"'),
            document.fonts?.load('300 100px "Spline Sans Mono"'),
            document.fonts?.load('400 100px "Poppins"'),
            document.fonts?.ready,
          ]);
        } catch {
          // Use the best available font state if one face fails to load.
        }

        fontsDone = true;
        initScene();
      };

      void loadFontFaces();
    };

    body.classList.add("site-loader-active");
    body.style.overflow = "hidden";

    if (CONFIG.showOncePerSession && sessionStorage.getItem(SESSION_KEY)) {
      loaderEl.style.display = "none";
      body.classList.remove("site-loader-active");
      body.style.overflow = previousOverflow;
      return () => undefined;
    }

    window.addEventListener("load", completePage);
    document.fonts?.ready.then(completeFonts).catch(() => undefined);

    runtimeRef.current = {
      startScene: initScene,
      dispose: () => {
        disposed = true;
        stopTimers();
        window.removeEventListener("load", completePage);
        window.removeEventListener("mousemove", handlePointerMove);
        window.removeEventListener("resize", handleResize);
        body.classList.remove("site-loader-active");
        body.style.overflow = previousOverflow;
        disposeLoader();
      },
    };

    startLoader();

    return () => {
      disposed = true;
      stopTimers();
      window.removeEventListener("load", completePage);
      window.removeEventListener("mousemove", handlePointerMove);
      window.removeEventListener("resize", handleResize);
      runtimeRef.current = null;
      body.classList.remove("site-loader-active");
      body.style.overflow = previousOverflow;
      disposeLoader();
    };
  }, []);

  return (
    <>
      <Script
        src="https://cdnjs.cloudflare.com/ajax/libs/three.js/r128/three.min.js"
        strategy="afterInteractive"
        crossOrigin="anonymous"
        referrerPolicy="no-referrer"
        onLoad={() => {
          threeReadyRef.current = true;
          runtimeRef.current?.startScene();
        }}
      />
      <div
        ref={loaderRef}
        className="site-loader"
        aria-hidden="true"
      >
        <div ref={stageRef} className="site-loader__stage">
          <canvas ref={canvasRef} className="site-loader__canvas" />
          <div ref={counterRef} className="site-loader__counter">
            0%
          </div>
        </div>
      </div>
    </>
  );
};

export default GlobalLoader;
