declare module 'scaleapp' {
  class Core {
    constructor(sandbox?: any);
    boot(): any;
    use(plugin: any, options?: any): any;
    log: {
      error: (message: string) =>  any;
      info: (message: string) => any;
      warn: (message: string) => any;
    };
    scaleApp: any;
  }

  interface IPlugin {
    init: (instanceSandbox: any, options: {}) => any;
    destroy: () => any;
  }

  interface IPluginInitFn {
    (core: any, options: {}): IPlugin;
  }

  interface IModule {
    init: (opts: {el: string}, done: () => void) => void;
    destroy: (done: () => void) => any;
  }

  interface IModuleInitFn {
    (instanceSandbox: any): IModule;
  }
}
