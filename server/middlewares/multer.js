import multer from 'multer';

const storage = multer.memoryStorage();

const multerUploads = name => multer({ storage }).single(name);

export default multerUploads;
