export function formatarMoeda(value: string) {
    let valor: string = value
    valor = valor + '';
    valor = parseInt(valor.replace(/[\D]+/g, '')).toString();
    valor = valor + '';
    valor = valor.replace(/([0-9]{2})$/g, ",$1");

    if (valor.length > 6) {
        valor = valor.replace(/([0-9]{3}),([0-9]{2}$)/g, ".$1,$2");
    }


    return valor === 'NaN' ? value = '' : valor;

}

export const formatCurrency = (value: number) => {
    return value.toLocaleString('pt-br',{style: 'currency', currency: 'BRL'});

}