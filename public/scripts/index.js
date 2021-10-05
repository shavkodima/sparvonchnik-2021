import generateCatalog from './generateCatalog.js'
import generateHeader from './generateHeader.js';
import preloaderModuleSerach from './preloaderSearch.js';
import { loadData } from './loadData.js';
import { validation } from './validation.js';

    

            generateHeader();
            //generateFooter();
            generateCatalog();
            loadData();
            preloaderModuleSerach();
            validation();






