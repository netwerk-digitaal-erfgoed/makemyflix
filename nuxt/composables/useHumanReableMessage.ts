export default (code: string) => {
  switch (code) {
    case 'INVALID_FIELDS':
      return 'Gelieve alle velden in te vullen.';
    case 'INVALID_CATEGORY_QUERY':
      return 'Er zit een fout in de Category Query';
    case 'INVALID_CATEGORY_STRUCTURE':
      return 'De Category Query geeft niet de juiste velden terug';
    case 'INVALID_CATEGORY_ID':
      return 'De Category Query gaf geen resultaten terug';
    case 'INVALID_ITEMS_QUERY':
      return 'Er zit een fout in de Items Query';
    case 'INVALID_ITEMS_STRUCTURE':
      return 'De Items Query geeft niet de juiste velden terug';
    default:
      return 'Er is een onbekende fout opgetreden.';
  }
};
