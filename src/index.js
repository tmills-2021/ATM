import React from 'react';
import ReactDOM from 'react-dom';

const ATMDeposit = ({ onChange, isDeposit, validTransaction}) => {
  const choice = ['Deposit', 'Cash Back'];
  console.log(`ATM isDeposit: ${isDeposit}`);
  console.log(`ATM isDeposit: ${validTransaction}`);

  return (
    <label className="label huge">
      <h3> {choice[Number(!isDeposit)]}</h3>
      <input id="number-input" type="number" width="200" onChange={onChange}></input>
      <input type="submit" width="200" value="Submit" id="submit-input" disabled={!validTransaction && isDeposit || validTransaction  ? '': 'disabled'}></input>
    </label>
  );
};

const Account = () => {
  const [atmMode, setAtmMode] = React.useState("");
  const [deposit, setDeposit] = React.useState(0);
  const [totalState, setTotalState] = React.useState(0);
  const [isDeposit, setIsDeposit] = React.useState(true);
  const [validTransaction, setValidTransaction] = React.useState(false);

  let status = `Account Balance $ ${totalState} `;
  console.log(`Account Rendered with isDeposit: ${isDeposit}`);
  const handleChange = (event) => {
    console.log(`handleChange ${event.target.value}`);
    setDeposit(Number(event.target.value));
    if (Number(event.target.value) <= 0) {setValidTransaction(false); return;}
    if (Number(event.target.value) > totalState){
      setValidTransaction(false);
    } 
    else {
      setValidTransaction(true);
    }
  };
  const handleSubmit = (event) => {
    event.preventDefault();    
    let newTotal = isDeposit ? totalState + deposit : totalState - deposit;
    setTotalState(newTotal);
    setValidTransaction(false);
  };

  const handleModeSelect = (event) => {
    let newMode = event.target.value;
    setAtmMode(newMode);
    if (newMode != '') {
      let depositMode = newMode == 'Deposit' ? true : false;
      setIsDeposit(depositMode);      
    }
    event.preventDefault();
  };  

  return (
    <form onSubmit={handleSubmit}>
      <h2 id="total">{status}</h2>
      <label>Select an action below to continue</label>
      <select onChange={(e) => handleModeSelect(e)} name="mode" id="mode-select">
      <option id="no-selection" value=""></option>
      <option id="deposit-selection" value="Deposit">Deposit</option>
      <option id="cashback-selection" value="Cash Back">Cash Back</option>
      </select>      
      {
       atmMode && <ATMDeposit onChange={handleChange} isDeposit={isDeposit} validTransaction={validTransaction}></ATMDeposit>
      }
    </form>
  );
};
// ========================================
ReactDOM.render(<Account />, document.getElementById('root'));
