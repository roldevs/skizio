import { Canvas, loadImage, NodeCanvasRenderingContext2DSettings } from 'canvas';
import R from 'ramda';
import { IPC } from '../../typings/pc';
import { IArm, IArmor } from '../gear';
import { ILoaderFactory } from '../loader';
import { ILocalizeFactory } from '../localize';

interface ICanvasElement {
  font?: string;
  size: string;
  posx: number;
  posy: number;
  lense: string[];
  maxWidth?: number;
  lineHeight?: number;
}

interface ICanvasSheetConfig {
  loader: ILoaderFactory;
  canvas: Canvas;
}

interface ICanvasSheetFactory {
  fill: (pc: IPC) => Promise<Canvas>;
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

    const getArmText: (arm: IArm) => string =
      (arm) => R.join(' ', [
        R.prop('name', arm),
        R.prop('damage', arm),
      ]);

    const getArmorText: (arm: IArmor) => string = R.prop('name');

    const getText: (pcObject: IPC, element: ICanvasElement) => string =
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

    const printArmElements: (pcObject: IPC, element: ICanvasElement) => void =
      (pcObject, element) => {
          let posy: number = element.posy;
          R.forEach((arm: IArm) => {
            context.fillText(getArmText(arm), element.posx, posy);
            posy += element.lineHeight!;
          }, R.view(R.lensPath(element.lense), pcObject));
      };

    const printArmorElements: (pcObject: IPC, element: ICanvasElement) => void =
      (pcObject, element) => {
          let posy: number = element.posy;
          R.forEach((arm: IArmor) => {
            context.fillText(getArmorText(arm), element.posx, posy);
            posy += element.lineHeight!;
          }, R.view(R.lensPath(element.lense), pcObject));
      };

    const printRaceElements: (pcObject: IPC, element: ICanvasElement) => void =
      (pcObject, element) => {
        const fontFamily: string = 'Arial';
        const text: string = getText(pcObject, element);
        if (text.length > 10) {
          context.font = `40px ${fontFamily}`;
        }
        context.fillText(text, element.posx, element.posy);
      };

    // TODO: Apply SOLID principles
    const printValue: (pcObject: IPC, element: ICanvasElement) => void =
      (pcObject, element) => {
        const fontFamily: string = 'Arial';
        context.font = `${element.size} ${fontFamily}`;
        if (R.contains('arms', element.lense)) {
          return printArmElements(pcObject, element);
        }
        if (R.contains('armors', element.lense)) {
          return printArmorElements(pcObject, element);
        }
        if (R.contains('race', element.lense)) {
          return printRaceElements(pcObject, element);
        }
        if (element.maxWidth) {
          return printWrappedElement(getText(pcObject, element).toString(), element);
        }
        return context.fillText(getText(pcObject, element), element.posx, element.posy);
      };

    const printElement: (pcObject: IPC) => (element: ICanvasElement) => void =
      (pcObject) => (element) => printValue(pcObject, element);

    const drawElements: (pcObject: IPC) => (elements: ICanvasElement[]) => void =
      (pcObject) => R.forEach(printElement(pcObject));

    const loadCanvasElements: () => ICanvasElement[] = config.loader.getCanvasSheetData;

    const fill: (pc: IPC) => Promise<Canvas> =
      (pc: IPC) => {
        return loadImage(config.loader.getCanvasSheetImagePath()).then((image) => {
          context.drawImage(image, 0, 0);
          drawElements(pc)(loadCanvasElements());
          return config.canvas;
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
