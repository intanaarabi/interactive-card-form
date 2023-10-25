function ExpiryInput() {
  return (
    <div className="flex flex-col">
      <label htmlFor="month" className="uppercase font-medium text-sm tracking-wide mb-2">Expiry Date (MM/YY)</label>
      <div className="flex gap-2">
        <input 
          type="text" 
          id="month" 
          name="mmalias" 
          placeholder="MM"
          maxLength="2" 
          className="border rounded w-20 border p-2"
          autoComplete="off"
        />
        <input 
          type="text" 
          name="yyalias" 
          placeholder="YY"
          maxLength="2" 
          className="border rounded w-20 border p-2"
          autoComplete="off"
        />
      </div>
    </div>
  );
}

export default ExpiryInput;
