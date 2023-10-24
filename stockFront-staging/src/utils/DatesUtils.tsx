export const dataAtualTela = () => {
    const date = new Date()
    const dia = date.getDate()
    const mes = date.getMonth() + 1
    const ano = date.getFullYear()

    return dia.toString().padStart(2, "0") + "/" + mes.toString().padStart(2, "0") + '/' + ano
}
export const horaAtualTela = () => {
    const agora = new Date();
    const fusoHorarioBrasil = "America/Sao_Paulo";
    const opcoes = { timeZone: fusoHorarioBrasil, hour12: false };

    const horaAtual = agora.toLocaleTimeString("pt-BR", opcoes);
    return  formatarHoraPara24(horaAtual);
}

export const formatDataAtualTela = (date: string) => {
    const [ano, mes, dia] = date.split("-")

   return `${dia}/${mes}/${ano}`
}
function formatarHoraPara24(hora: string) {
    const partes = hora.split(":");
    const horas = parseInt(partes[0], 10);
    const minutos = partes[1];

    return `${horas}:${minutos}`;
}
