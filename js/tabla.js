$('.resumen-table>tbody').empty()
  document.querySelectorAll('.detalles-resumen tbody tr').forEach(function (e) {
    var valor = e.querySelector('.total').innerText.replace("$", "")
    let asiento = e.querySelector('.asiento').innerText
    comision += parseFloat(asiento)
    subtotal += parseFloat(valor)
    var filas = "<tr><td class='lugar'>" + evento + "</td>"
    filas = filas + "<td class='localidad'>" + e.querySelector('.localidad').innerText + "</td>"
    filas = filas + "<td class='filas'>" + e.querySelector('.fila').innerText + "</td>"
    filas = filas + "<td class='cantida'>" + e.querySelector('.asiento').innerText + "</td>"
    filas = filas + "<td class='valor'>" + e.querySelector('.total').innerText + "</td></tr>"
    $('.resumen-table>tbody').append(filas)
  });