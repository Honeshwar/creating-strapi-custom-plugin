// import { Page } from '@strapi/strapi/admin';
// import { Routes, Route } from 'react-router-dom';

// import { HomePage } from './HomePage';

// const App = () => {
//   return (
//     <Routes>
//       <Route index element={<HomePage />} />
//       <Route path="*" element={<Page.Error />} />
//     </Routes>
//   );
// };

// export { App };

import React from 'react';

const App = () => {
  return (
    // <div>
    //   <h1>Welcome to My Plugin</h1>
    //   <p>This is your custom admin panel section.</p>
    // </div>
    <div style={{
      width: '100%',
      height: '100vh',
      overflow: 'hidden'
    }}>


      <iframe src="http://localhost:1337/editor.html" style={{
        width: '100%',
        height: '100%',
        border: 'none'
      }}></iframe>
    </div>
  );
};

export default App;
