import Bluebird from 'bluebird';
import { Canvas, Image, loadImage } from 'canvas';
import R from 'ramda';
import { IArmItem } from '../../typings/arm';
import { IRatsPC } from '../../typings/pc';
import { ILoaderFactory } from '../loader';

interface ICanvasElement {
  font?: string;
  size: string;
  posx: number;
  posy: number;
  lense: string[];
  maxWidth?: number;
  lineHeight?: number;
}

interface IRect {
  posx: number;
  posy: number;
  width: number;
  height: number;
}

interface ICanvasSheetConfig {
  locale: string;
  loader: ILoaderFactory;
  canvas: Canvas;
}

interface ICanvasSheetFactory {
  fill: (pc: IRatsPC) => Promise<Canvas>;
}

type TCanvasSheet = (config: ICanvasSheetConfig) => ICanvasSheetFactory;

const CanvasSheet: TCanvasSheet =
  (config) => {
    const context = config.canvas.getContext('2d');

    interface IWrapTextSettings {
      context: any;
      posx: number;
      posy: number;
      maxWidth: number;
      lineHeight: number;
    }

    const wrapText: (options: IWrapTextSettings, text: string) => void =
      (options, text) => {
        const words = R.split(' ', text);
        let y = options.posy;
        let line = '';

        for (let n = 0; n < words.length; n++) {
          const testLine = line + words[n] + ' ';
          const metrics = options.context.measureText(testLine);
          const testWidth = metrics.width;
          if (testWidth > options.maxWidth && n > 0) {
            context.fillText(line, options.posx, y);
            line = words[n] + ' ';
            y += options.lineHeight;
          } else {
            line = testLine;
          }
        }
        context.fillText(line, options.posx, y);
      };

    const getText: (pcObject: IRatsPC, element: ICanvasElement) => string =
      (pcObject, element) => R.view(R.lensPath(element.lense), pcObject);

    const printWrappedElement: (value: string, element: ICanvasElement) => void =
      (value, element) => {
        const options: IWrapTextSettings = {
          context,
          posx: element.posx,
          posy: element.posy,
          maxWidth: element.maxWidth!,
          lineHeight: element.lineHeight!,
        };
        return wrapText(options, value.toString());
      };

    const printArmsElements: (pcObject: IRatsPC, element: ICanvasElement) => void =
      (pcObject, element) => {
        const armItem: IArmItem = R.view(R.lensPath(element.lense), pcObject);
        const text: string = `${armItem.name} (${armItem.damage})`;
        context.fillText(text, element.posx, element.posy);
      };

    // TODO: Apply SOLID principles
    const printValue: (pcObject: IRatsPC, element: ICanvasElement) => void =
      (pcObject, element) => {
        const fontFamily: string = 'Arial';
        context.font = `${element.size} ${fontFamily}`;
        if (R.contains('arms', element.lense)) {
          return printArmsElements(pcObject, element);
        }
        if (element.maxWidth) {
          return printWrappedElement(getText(pcObject, element).toString(), element);
        }
        return context.fillText(getText(pcObject, element), element.posx, element.posy);
      };

    const printElement: (pcObject: IRatsPC) => (element: ICanvasElement) => void =
      (pcObject) => (element) => printValue(pcObject, element);

    const drawElements: (pcObject: IRatsPC) => (elements: ICanvasElement[]) => void =
      (pcObject) => R.forEach(printElement(pcObject));

    const loadCanvasElements: () => ICanvasElement[] = config.loader.getCanvasSheetData;

    const PCImageRect: (locale: string) => IRect =
      (locale) => {
        if (locale === 'es') {
          return { posx: 285, posy: 312, width: 170, height: 178 };
        }
        return { posx: 280, posy: 226, width: 190, height: 214 };
      };

    const loadPCImage: (pc: IRatsPC) => Promise<any> =
      (pc) => new Promise((resolve) => {
        const img = new Image();
        img.onload = () => {
          const rect: IRect = PCImageRect(config.locale);
          context.drawImage(img, rect.posx, rect.posy, rect.width, rect.height);
          resolve(img);
        };
        img.src = pc.imageUrl;
      });

    const fill: (pc: IRatsPC) => Promise<Canvas> =
      (pc: IRatsPC) => {
        return loadPCImage(pc).then(() => {
          return loadImage(config.loader.getCanvasSheetImagePath()).then((image) => {
            context.drawImage(image, 0, 0);
            drawElements(pc)(loadCanvasElements());
            return config.canvas;
          });
        });
      };

    return {
      fill,
    };
  };

export {
  ICanvasElement,
  ICanvasSheetConfig,
  ICanvasSheetFactory,
  TCanvasSheet,
  CanvasSheet,
};
