import Comparator from "./components/Comparator";
import {useState} from 'react'

function App() {
  const [productIdState, setProductIdState] = useState(1)
  const [title, setTitle] = useState('initial title')
  return (
    <div className="App">
      <h1>This is PDP</h1>
      <div>
        <p>Product ID = {productIdState}</p>
        <button onClick={() => setProductIdState(productIdState + 1)}>Change Product ID</button>
      </div>
      <div>
        <p>Title= {title}</p>
        <button onClick={() => setTitle(`New title + ${productIdState}`)}>Change Product Title</button>
      </div>
      <br />
      <div style={{ border: '2px solid blue', minHeight: '80vh' }}>
        <h2>This is item info</h2>
      </div>
      <br />
      <Comparator
        // apiResponse={{ recommendations: [1, 2] }}
        clients={['clienteProducto', 'clienteHistorial']}
        track={`data track from ${productIdState}`}
        productId={productIdState}
        handleProductId={setProductIdState}
      />
    </div>
  );
}

export default App;
