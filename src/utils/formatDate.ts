export function formatDate(date: Date){
  return new Intl.DateTimeFormat('pt-br').format(date);
}
