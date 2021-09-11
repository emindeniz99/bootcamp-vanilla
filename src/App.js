import data from "./data";

const App = () => {
  return (
    <div className="App">
      <CurrencyTable currencies={data.currencies} />
    </div>
  );
};

const CurrencyTable = ({ currencies }) => {
  const fields = {
    exchangeType: "Döviz Cinsi",
    buy: "Alış(TL)",
    sell: "Satış(TL)",
    diff: "Fark(%)",
  };
  return (
    <>
      <Table>
        <thead>
          <tr>
            {Object.values(fields).map((val, index) => (
              <HeadCell key={index}>{val}</HeadCell>
            ))}
          </tr>
        </thead>
        <tbody>
          {currencies.map((currency, index) => (
            <tr key={index}>
              {Object.keys(fields).map((field, index) => (
                <DataCell key={index}>{currency[field]}</DataCell>
              ))}
            </tr>
          ))}
        </tbody>
      </Table>
    </>
  );
};

const Table = ({ children }) => {
  return <table style={{ border: "1px solid black" }}>{children}</table>;
};
const DataCell = ({ children }) => {
  return <td style={{ border: "1px solid black" }}>{children}</td>;
};
const HeadCell = ({ children }) => {
  return <th style={{ border: "1px solid black" }}>{children}</th>;
};
export default App;
