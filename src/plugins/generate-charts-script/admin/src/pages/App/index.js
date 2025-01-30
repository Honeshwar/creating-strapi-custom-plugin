/**
 *
 * This component is the skeleton around the actual pages, and should only
 * contain code that should be seen on all pages. (e.g. navigation bar)
 *
 */

const App = () => {
  return (
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
