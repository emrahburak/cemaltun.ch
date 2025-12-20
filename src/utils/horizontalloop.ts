import gsap from "gsap";
import { Draggable } from "gsap/Draggable";

export function horizontalLoop(items: HTMLElement[], config: any = {}) {
  items = gsap.utils.toArray(items);
  config = config || {};

  let tl = gsap.timeline({
    repeat: config.repeat,
    paused: config.paused,
    defaults: { ease: "none" },
    onUpdate:
      config.onChange &&
      function(this: any) {
        const i = tl.closestIndex();
        if (lastIndex !== i) {
          lastIndex = i;
          config.onChange(items[i], i);
        }
      },
    onReverseComplete: () => {
      tl.totalTime(tl.rawTime() + tl.duration() * 100);
    },
  });

  let length = items.length,
    startX = items[0].offsetLeft,
    times: number[] = [],
    widths: number[] = [],
    xPercents: number[] = [],
    curIndex = 0,
    pixelsPerSecond = (config.speed || 1) * 100,
    snap =
      config.snap === false ? (v: any) => v : gsap.utils.snap(config.snap || 1),
    totalWidth: number,
    lastIndex = 0;

  gsap.set(items, { xPercent: 0 });

  items.forEach((el, i) => {
    widths[i] = parseFloat(gsap.getProperty(el, "width", "px") as string);
    xPercents[i] = snap(
      (parseFloat(gsap.getProperty(el, "x", "px") as string) / widths[i]) *
      100 +
      (gsap.getProperty(el, "xPercent") as number),
    );
  });

  totalWidth =
    items[length - 1].offsetLeft +
    (xPercents[length - 1] / 100) * widths[length - 1] -
    startX +
    items[length - 1].offsetWidth *
    (gsap.getProperty(items[length - 1], "scaleX") as number);

  for (let i = 0; i < length; i++) {
    let item = items[i],
      curX = (xPercents[i] / 100) * widths[i],
      distanceToStart = item.offsetLeft + curX - startX,
      distanceToLoop =
        distanceToStart +
        widths[i] * (gsap.getProperty(item, "scaleX") as number);

    tl.to(
      item,
      {
        xPercent: snap(((curX - distanceToLoop) / widths[i]) * 100),
        duration: distanceToLoop / pixelsPerSecond,
      },
      0,
    )
      .fromTo(
        item,
        {
          xPercent: snap(
            ((curX - distanceToLoop + totalWidth) / widths[i]) * 100,
          ),
        },
        {
          xPercent: xPercents[i],
          duration:
            (curX - distanceToLoop + totalWidth - curX) / pixelsPerSecond,
          immediateRender: false,
        },
        distanceToLoop / pixelsPerSecond,
      )
      .add("label" + i, distanceToStart / pixelsPerSecond);
    times[i] = distanceToStart / pixelsPerSecond;
  }

  function toIndex(index: number, vars: any = {}) {
    let newIndex = gsap.utils.wrap(0, length, index),
      time = times[newIndex];
    if (time > tl.time() !== index > curIndex) {
      time += tl.duration() * (index > curIndex ? 1 : -1);
    }
    curIndex = newIndex;
    vars.overwrite = true;
    return tl.tweenTo(time, vars);
  }

  tl.next = (vars: any) => toIndex(curIndex + 1, vars);
  tl.previous = (vars: any) => toIndex(curIndex - 1, vars);
  tl.toIndex = (index: number, vars: any) => toIndex(index, vars);
  tl.closestIndex = () => {
    let index = gsap.utils.snap(times, tl.time());
    return times.indexOf(index);
  };

  if (config.draggable && typeof Draggable === "function") {
    let proxy = document.createElement("div"),
      wrap = gsap.utils.wrap(0, 1),
      ratio: number,
      startProgress: number,
      draggable: any,
      // HATA BURADAYDI: Süslü parantez ekleyerek void dönüşü sağladık
      align = () => {
        tl.progress(
          wrap(startProgress + (draggable.startX - draggable.x) * ratio),
        );
      };

    draggable = Draggable.create(proxy, {
      trigger: items[0].parentNode as HTMLElement,
      type: "x",
      onPressInit() {
        gsap.killTweensOf(tl);
        startProgress = tl.progress();
        ratio = 1 / totalWidth;
        gsap.set(proxy, { x: startProgress / -ratio });
      },
      onDrag: align,
      onThrowUpdate: align,
      inertia: true,
      onRelease: () => {
        if (config.snap)
          tl.toIndex(tl.closestIndex(), { duration: 0.5, ease: "power3" });
      },
    })[0];
  }

  return tl;
}
