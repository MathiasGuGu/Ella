export interface IFile {
  id: string;
  url: string;
  name: string;
  type: string;
  fileRef: string;
  info: string;
}

export const files: IFile[] = [
  {
    id: "1",
    url: "https://cdn.dribbble.com/userupload/17310984/file/original-5c52195e6ab63acf4613a06d62b10dc3.png?resize=2048x1536",
    name: "1.png",
    type: "image/png",
    fileRef: "1",
    info: "Mockup of the front page of the website",
  },
  {
    id: "2",
    url: "https://cdn.dribbble.com/userupload/17310221/file/original-8be9237978fd6d7cf07f94faa9f1104b.png?resize=2048x1536",
    name: "2.png",
    type: "image/png",
    fileRef: "1",
    info: "Mockup of the front page of the website",
  },
  {
    id: "3",
    url: "https://cdn.dribbble.com/userupload/17310271/file/original-d728331ed8680fa54f985d6127662b3e.png?resize=2048x1536",
    name: "3.jpeg",
    type: "image/jpeg",
    fileRef: "3",
    info: "Mockup of the front page of the website",
  },
  {
    id: "4",
    url: "",
    name: "4.pdf",
    type: "application/pdf",
    fileRef: "4",
    info: "Designs and flows",
  },
  {
    id: "5",
    url: "https://cdn.dribbble.com/userupload/17310271/file/original-d728331ed8680fa54f985d6127662b3e.png?resize=2048x1536",
    name: "3.jpeg",
    type: "image/jpeg",
    fileRef: "3",
    info: "Mockup of the front page of the website",
  },
  {
    id: "6",
    url: "",
    name: "4.pdf",
    type: "application/pdf",
    fileRef: "4",
    info: "Designs and flows",
  },
];
