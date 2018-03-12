declare module "exif-js" {
  export const getData: (img: any, callback: any) => any;
  export const getTag: (img: any, tag: any) => any;
  export const getAllTags: (img: any) => any;
  export const pretty: (img: any) => string;
  export const readFromBinaryFile: (file: any) => any;
}
