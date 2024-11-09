"use strict";
/**
 * Recebe string '1.200,50' retorna number: 1200.50
 * @param moeda
 * @returns
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = moedaParaNumero;
function moedaParaNumero(moeda) {
    const numero = Number(moeda.replaceAll('.', "").replace(',', '.'));
    return isNaN(numero) ? null : numero;
}
