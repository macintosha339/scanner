import React, { useState } from "react";

function App() {
  const [tokenURI, setTokenURI] = useState('');
  const [data, setData] = useState(null);
  const [iframeUrl, setIframeUrl] = useState('');

  const handleTokenURIChange = (e) => {
    setTokenURI(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const subStr = 'https://data.ifiniti.co/'
      const regex = new RegExp(subStr, 'g');
      const newTokenURI = tokenURI.replace(regex, '');
      setTokenURI(newTokenURI);

      const response = await fetch(newTokenURI);
      const jsonData = await response.json();
      setData(jsonData);
    } catch (error) {
      console.error(error);
    }
  };

  const handleIframeOpen = () => {
    setIframeUrl(
      "https://data.ifiniti.co/ifc/ed348259-5864-440b-a4c5-523657361ede.json"
    );
  };

  return (
    <div className="container">
      <div className="input_container">
        <form onSubmit={handleSubmit}>
          <input type="text" value={tokenURI} onChange={handleTokenURIChange} />
          <button type="submit">Get Data</button>
        </form>
        <button onClick={handleIframeOpen}>Open iframe</button>
      </div>
      {iframeUrl && <iframe className="iframe_container" src={iframeUrl} title="Data from Ifiniti"></iframe>}
      {data && (
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Value</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>{Object.keys(data)[2]}</td>
              <td>{data.name}</td>
            </tr>
            <tr>
              <td>{Object.keys(data)[1]}</td>
              <td>
                <img src={data.image} alt="NFT" />
              </td>
            </tr>
            <tr>
              <td>{Object.keys(data)[0]}</td>
              <td>{data.description}</td>
            </tr>
            {data.attributes.map((attr) => (
              <tr key={attr.trait_type}>
                <td>{attr.trait_type}</td>
                <td>{attr.value}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default App;
