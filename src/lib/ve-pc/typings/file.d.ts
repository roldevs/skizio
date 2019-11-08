
interface IFileFactory {
  listDir: (path: string) => any;
  loadYAML: (path: string) => any;
}

export {
  IFileFactory,
};
