var Simulador = {
    simuladorId: null,
    loader: null,
    init: function(){
        this.simuladorId = $('#simulador');
        this.loader = $('#loader');
        var $this = this;
        $('#simuladorAnosEscolares').on('change',function () {
            switch ($(this).val()){
                case 'iniciais':
                    $this.insertFormAnosIniciais();
                    break;
                case 'finais':
                    $this.insertFormAnosFinais();
                    break;
                case 'medio':
                    $this.insertFormAnoMedio();
                    break;
                default:
                    $this.emptySimulador();
                    break;
            }
        })
    },
    insertFormAnosIniciais : function(){
        var html = '<h3>Taxa de aprovação - Anos Iniciais</h3>'+
            '<table class="table table-bordered table-condensed text-center">'+
            '<thead>'+
            '<tr>'+
            '<th>1º</th>'+
            '<th>2º</th>'+
            '<th>3º</th>'+
            '<th>4º</th>'+
            '<th>5º</th>'+
            '</tr>'+
            '</thead>'+
            '<tbody>'+
            '<tr>'+
            '<td>'+'<input type="text" name="ano1" size="5" class="form-control calculoTaxa" />'+
            '</td>'+
            '<td>'+'<input type="text" name="ano2" size="5" class="form-control calculoTaxa" />'+
            '</td>'+
            '<td>'+'<input type="text" name="ano3" size="5" class="form-control calculoTaxa" />'+
            '</td>'+
            '<td>'+'<input type="text" name="ano4" size="5" class="form-control calculoTaxa" />'+
            '</td>'+
            '<td>'+'<input type="text" name="ano5" size="5" class="form-control calculoTaxa" />'+
            '</td>'+
            '</tr>'+
            '</tbody>'+
            '</table>';

        html += '<h3>Nota Brasil - Anos Iniciais</h3>'+
            '<table class="table table-bordered table-condensed text-center">'+
            '<thead>'+
            '<tr>'+
            '<th>Matemática</th>'+
            '<th>Língua Portuguesa</th>'+
            '</tr>'+
            '</thead>'+
            '<tbody>'+
            '<tr>'+
            '<td>'+'<input type="text" name="ano1" size="5" class="form-control calculoMedia" />'+
            '</td>'+
            '<td>'+'<input type="text" name="ano2" size="5" class="form-control calculoMedia" />'+
            '</td>'+
            '</tr>'+
            '</tbody>'+
            '</table>';


        this.simuladorId.html(html);
        $('.calculoTaxa').decimalMask('999,9');
        $('.calculoMedia').decimalMask('999,99');
    },
    insertFormAnosFinais : function(){
        var html = '<h3>Taxa de aprovação - Anos Finais</h3>'+
            '<table class="table table-bordered table-condensed text-center">'+
            '<thead>'+
            '<tr>'+
            '<th>6º</th>'+
            '<th>7º</th>'+
            '<th>8º</th>'+
            '<th>9º</th>'+
            '</tr>'+
            '</thead>'+
            '<tbody>'+
            '<tr>'+
            '<td>'+'<input type="text" name="ano6" size="5" class="form-control calculoTaxa" />'+
            '</td>'+
            '<td>'+'<input type="text" name="ano7" size="5" class="form-control calculoTaxa" />'+
            '</td>'+
            '<td>'+'<input type="text" name="ano8" size="5" class="form-control calculoTaxa" />'+
            '</td>'+
            '<td>'+'<input type="text" name="ano9" size="5" class="form-control calculoTaxa" />'+
            '</td>'+
            '</tr>'+
            '</tbody>'+
            '</table>';

        html += '<h3>Nota Brasil - Anos Finais</h3>'+
            '<table class="table table-bordered table-condensed text-center">'+
            '<thead>'+
            '<tr>'+
            '<th>Matemática</th>'+
            '<th>Língua Portuguesa</th>'+
            '</tr>'+
            '</thead>'+
            '<tbody>'+
            '<tr>'+
            '<td>'+'<input type="text" name="ano1" size="5" class="form-control calculoMedia" />'+
            '</td>'+
            '<td>'+'<input type="text" name="ano2" size="5" class="form-control calculoMedia" />'+
            '</td>'+
            '</tr>'+
            '</tbody>'+
            '</table>';

        this.simuladorId.html(html);
        $('.calculoTaxa').decimalMask('999,9');
        $('.calculoMedia').decimalMask('999,99');
    },
    insertFormAnoMedio : function(){
        var html = '<h3>Taxa de aprovação - Ensino Médio</h3>'+
            '<table class="table table-bordered table-condensed text-center">'+
            '<thead>'+
            '<tr>'+
            '<th>1º</th>'+
            '<th>2º</th>'+
            '<th>3º</th>'+
            '</tr>'+
            '</thead>'+
            '<tbody>'+
            '<tr>'+
            '<td>'+'<input type="text" name="anoMedio1" size="5" class="form-control calculoTaxa" />'+
            '</td>'+
            '<td>'+'<input type="text" name="anoMedio2" size="5" class="form-control calculoTaxa" />'+
            '</td>'+
            '<td>'+'<input type="text" name="anoMedio3" size="5" class="form-control calculoTaxa" />'+
            '</td>'+
            '</tr>'+
            '</tbody>'+
            '</table>';

        html += '<h3>Nota Brasil / SAEB - Ensino Médio</h3>'+
            '<table class="table table-bordered table-condensed text-center">'+
            '<thead>'+
            '<tr>'+
            '<th>Matemática</th>'+
            '<th>Língua Portuguesa</th>'+
            '</tr>'+
            '</thead>'+
            '<tbody>'+
            '<tr>'+
            '<td>'+'<input type="text" name="matematica" size="5" class="form-control calculoMedia" />'+
            '</td>'+
            '<td>'+'<input type="text" name="portugues" size="5" class="form-control calculoMedia" />'+
            '</td>'+
            '</tr>'+
            '</tbody>'+
            '</table>';

        this.simuladorId.html(html);
        $('.calculoTaxa').decimalMask('999,9');
        $('.calculoMedia').decimalMask('999,99');
    },
    emptySimulador : function(){
        this.simuladorId.empty();
    },
    calcular : function(){
        this.loader.show();

        var calculoTaxa = $('.calculoTaxa');
        var calculoMedia = $('.calculoMedia');
        var $simuladorAnosEscolares = $('#simuladorAnosEscolares').val();
        var somaTaxa = 0.0;
        var P = 0;
        var N = 0;
        var LP = 0;
        var MT = 0;
        var ideb = 0;

        if(calculoTaxa.length == 0 && calculoMedia.length == 0){
            this.loader.hide();
            alert('Selecione a fase escolar para calcular o IDEB');
	    return;
        }

        calculoTaxa.each(function(index,obj){
            if(obj.value != ''){
                var val = parseFloat(obj.value.replace(',','.'));

                if(val > 100 || val < 0){
                    alert('Os valores da taxa de aprovação devem ser menores que 100');
                    return false;
                }

                somaTaxa += val;
            }
        });

        P = ((somaTaxa.toFixed(1)/calculoTaxa.length)/100).toFixed(2);
        LP = (calculoMedia[1].value=='')? 0.00 : parseFloat(calculoMedia[1].value.replace(',','.')).toFixed(2);
        MT = (calculoMedia[0].value=='')? 0.00 : parseFloat(calculoMedia[0].value.replace(',','.')).toFixed(2);

        switch ($simuladorAnosEscolares){
            case 'iniciais':
                LP = parseFloat((((LP - 48.5)/276)*10).toFixed(2));
                MT = parseFloat((((MT - 58.8)/264)*10).toFixed(2));
                break;
            case 'finais':
                LP = parseFloat((((LP - 100)/300)*10).toFixed(2));
                MT = parseFloat((((MT - 100)/300)*10).toFixed(2));
                break;
            case 'medio':
                LP = parseFloat((((LP - 115.9)/336)*10).toFixed(2));
                MT = parseFloat((((MT - 111.7)/354)*10).toFixed(2));
                break;
        }

        N = parseFloat(((LP+MT)/2).toFixed(2));
        ideb = (P*N).toFixed(1);

        $('.alert-success').remove();
        this.simuladorId.prepend('<div class="alert alert-success" role="alert">IDEB = '+ideb+'</div>');
        this.loader.hide();
    }
};
Simulador.init();
