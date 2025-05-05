import { NavigateFunction } from "react-router-dom";
function formatNumber(value:any) {
    if (!value) return '0';
  
    // Round the value to two decimal places
    const roundedValue = Math.round(value * 100) / 100;
  
    // Convert to string and format
    const formattedValue = roundedValue.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ' ');
    return formattedValue;
  }

  function navigateByRole(role: string ,navigate: NavigateFunction) {
    switch (role) {
      case 'user':
        navigate('/');
        break;
      case 'admin':
        navigate('/dashboardAdmin');
        break;
      default:
        navigate('/');
    }
  }
  

  export default {
    formatNumber,
    navigateByRole
  }