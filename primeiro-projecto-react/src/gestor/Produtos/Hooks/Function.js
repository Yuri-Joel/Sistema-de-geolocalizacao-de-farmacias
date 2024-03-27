

export const handleDateChange = async(inputDate ) => {
        
    // Verifica se a data está no formato correto (dd/mm/aaaa)
    const datePattern = /^(\d{2})\/(\d{2})\/(\d{4})$/;
    if (!datePattern.test(inputDate)) {
     console.log('Formato de data inválido. Use dd/mm/aaaa');
     return false
    } else {
     
      const [day, month, year] = inputDate.split('/').map(Number);
      const currentDate = new Date();
      const inputDateObj = new Date(year, month - 1, day);
  
      // Verifica se a data é válida
      if (
        inputDateObj.getDate() !== day ||
        inputDateObj.getMonth() !== month - 1 ||
        inputDateObj.getFullYear() !== year
      ) {
        console.log('Data inválida.');
        return false
      } else if (inputDateObj < currentDate) {
        console.log('A data não pode ser anterior à data atual.');
        return false
      } else if (year < currentDate.getFullYear() && year < currentDate.getFullYear()+ 5 ) {
        console.log('O ano deve ser igual ou maior que o ano atual.');
        return false
      } 
      else if (month < 1 || month > 12) {
        console.log('O mês deve estar entre 1 e 12.');
        return false
      } else {
        
        return true
      }
    }
  };
