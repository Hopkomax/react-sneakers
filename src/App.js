import Card from './components/Card'
import Header from './components/Header';
import Drawer from './components/Drawer';

function App() {
  return (
    <div className="wrapper clear">
      
        <Drawer />

      <Header />
      <div className="content p-40">
        <div className="d-flex align-center justify-between mb-40">
          <h1>All sneakers</h1>
          <div className="search-block d-flex">
            <img src="/img/search.svg" alt="Search"></img>
            <input placeholder="Search..." />
          </div>
        </div>
        <div className="d-flex">
          <Card />
         
          <div className="card">
            <img
              width={133}
              height={112}
              src="/img/sneakers/2.jpg"
              alt=""
            ></img>
            <h5>Men's Sneakers Nike Blazer Mid Suede</h5>
            <div className="d-flex justify-between align-center">
              <div className="d-flex flex-column">
                <span>Price:</span>
                <b>150 $</b>
              </div>
              <button className="button">
                <img width={11} height={11} src="/img/plus.svg" alt=""></img>
              </button>
            </div>
          </div>
          <div className="card">
            <img
              width={133}
              height={112}
              src="/img/sneakers/3.jpg"
              alt=""
            ></img>
            <h5>Men's Sneakers Nike Blazer Mid Suede</h5>
            <div className="d-flex justify-between align-center">
              <div className="d-flex flex-column">
                <span>Price:</span>
                <b>150 $</b>
              </div>
              <button className="button">
                <img width={11} height={11} src="/img/plus.svg" alt=""></img>
              </button>
            </div>
          </div>
          <div className="card">
            <img
              width={133}
              height={112}
              src="/img/sneakers/4.jpg"
              alt=""
            ></img>
            <h5>Men's Sneakers Nike Blazer Mid Suede</h5>
            <div className="d-flex justify-between align-center">
              <div className="d-flex flex-column">
                <span>Price:</span>
                <b>150 $</b>
              </div>
              <button className="button">
                <img width={11} height={11} src="/img/plus.svg" alt=""></img>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
