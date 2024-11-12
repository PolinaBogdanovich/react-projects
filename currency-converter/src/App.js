import React from 'react';
import { Block } from './Block';
import './index.scss';

function App() {
  const [fromCurrency, setFromCurrency] = React.useState('BYN');
  const [toCurrency, setToCurrency] = React.useState('USD');
  const [fromPrice, setFromPrice] = React.useState(0);
  const [toPrice, setToPrice] = React.useState(1);

  const ratesRef = React.useRef({});
  const ratesFetched = React.useRef(false);

  React.useEffect(() => {
    fetch('https://www.cbr-xml-daily.ru/daily_json.js')
      .then((res) => res.json())
      .then((json) => {
        ratesRef.current = json.Valute;
        ratesFetched.current = true;
        onChangeToPrice(1);
      })
      .catch((err) => {
        console.warn(err);
        alert('Не удалось получить информацию!');
      });
  }, []);

  const getCurrencyValue = (currency) => {
    if (ratesRef.current[currency]) {
      return ratesRef.current[currency]["Value"]
    }
    else {
      return 1;
    }
  }

  const onChangeFromPrice = (value) => {
    const price = value * getCurrencyValue(fromCurrency);
    const result = price / getCurrencyValue(toCurrency);
    setToPrice(result.toFixed(3));
    setFromPrice(value);
  }

  const onChangeToPrice = (value) => {
    const price = value * getCurrencyValue(toCurrency);
    const result = price / getCurrencyValue(fromCurrency);
    setFromPrice(result.toFixed(3));
    setToPrice(value);
  }

  React.useEffect(() => {
    if (ratesFetched.current) {
      onChangeFromPrice(fromPrice);
    }
  }, [fromCurrency]);

  React.useEffect(() => {
    if (ratesFetched.current) {
      onChangeToPrice(toPrice);
    }
  }, [toCurrency]);

  return (
    <div className="App">
      <Block value={fromPrice} currency={fromCurrency} onChangeCurrency={setFromCurrency} onChangeValue={onChangeFromPrice}/>
      <Block value={toPrice} currency={toCurrency} onChangeCurrency={setToCurrency} onChangeValue={onChangeToPrice}/>
    </div>
  );
}

export default App;