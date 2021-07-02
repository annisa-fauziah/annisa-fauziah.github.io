aturCanvas();
setJudul("Gerak dan Kecepatan");
hapusLayar("#000080");

//listener untuk membaca event mouse
canvas.onmousedown = mouseDown;
canvas.onmouseup = mouseUp;

var graf = {startX:50, startY:140, dataW:16, dataH:3, tileW:40, skalaX:10, skalaY:10, desimalX:0, desimalY:0, offsetX:0, offsetY:3, xLabel:'x (m)', yLabel:'noaxis', fontLabel:'11pt Calibri', warnaBG:'#daf6fb', warnaGaris:'#000', warnaLabel:'white'}

var slider1 = {tipe:"H", nama:"posisi1", x:75,y:420, p:200, minS:0, maxS:50, valS:0, desimal:0, label:"m"}
var slider2 = {tipe:"H", nama:"kecepatan1", x:75,y:480, p:200, minS:0, maxS:10, valS:5, desimal:1, label:"m/s"}
var slider3 = {tipe:"H", nama:"acc1", x:75,y:540, p:200, minS:-2, maxS:2, valS:0, desimal:1, label:"m/s²"}
var slider4 = {tipe:"H", nama:"posisi2", x:475,y:420, p:200, minS:0, maxS:50, valS:0, desimal:0, label:"m"}
var slider5 = {tipe:"H", nama:"kecepatan2", x:475,y:480, p:200, minS:0, maxS:10, valS:5, desimal:1, label:"m/s"}
var slider6 = {tipe:"H", nama:"acc2", x:475,y:540, p:200, minS:-2, maxS:2, valS:0, desimal:1, label:"m/s²"}

var index = 0;
var xBase = graf.startX;
var yBase = graf.startY;
var radius = 6;
var x1Init = 0;
var x1 = xBase;
var v1 = 5.0;
var a1 = 0.0
var y1 = yBase + graf.tileW;
var x2Init = 0.0;
var x2 = xBase;
var v2 = 5.0;
var a2 = 0.0
var y2 = yBase + graf.tileW*2;
var time = 0.0;
var timer;
var simAktif = 0;

var fileGambar = {
	mobil_biru: "images/mobil_biru.png",
	mobil_merah: "images/mobil_merah.png",
}

preload(fileGambar, setSimulasi);

function setSimulasi(){
	//menghentikan aplikasi ketika salah satu mobil mencapai ujung lintasan
	if ((x1 >= (xBase+graf.tileW*graf.dataW)) || (x2 >= (xBase+graf.tileW*graf.dataW)) || (x1 < xBase) || (x2 < xBase) || (time >= 50)) simAktif = 0;
	//jika animasi aktif
	if (simAktif == 1) index = index + 1;
	hapusLayar();
	//menampilkan teks
	teks("Gerak dan Kecepatan", 0.5*(canvas.width), 40, 'bold 18pt Calibri', 'blue', 'center');
	teks("Simulasi perbandingan pengaruh kecepatan dan akselerasi antara 2 objek", 0.5*(canvas.width), 75, "12pt Calibri", "white", "center");

	grafik(graf);

	//slider
	teks("Mobil Merah", 50, 370, "bold 15pt Calibri", "red", "left");
	teks("Posisi Awal = "+x1Init+ " m", 50, 400, "bold 13pt Calibri", "white", "left");
	slider(slider1);
	teks("Kecepatan = "+v1+ " m/s", 50, 460, "bold 13pt Calibri", "white", "left");
	slider(slider2);
	teks("Akselerasi = "+a1+ " m/s²", 50, 520, "bold 13pt Calibri", "white", "left");
	slider(slider3);

	teks("Mobil Biru", 450, 370, "bold 15pt Calibri", "blue", "left");
	teks("Posisi Awal = "+x2Init+ " m", 450, 400, "bold 13pt Calibri", "white", "left");
	slider(slider4);
	teks("Kecepatan = "+v2+ " m/s", 450, 460, "bold 13pt Calibri", "white", "left");
	slider(slider5);
	teks("Akselerasi = "+a2+ " m/s²", 450, 520, "bold 13pt Calibri", "white", "left");
	slider(slider6);

	//tombol control
	tombol("Play", 150,300, 80, 30, "bold 11pt Calibri", "white", "black", "gray", "r");
	tombol("Pause", 240,300, 80, 30, "bold 11pt Calibri", "white", "black", "gray", "r");
	tombol("<< Step", 330,300, 80, 30, "bold 11pt Calibri", "white", "black", "gray", "r");
	tombol("Step >>", 420,300, 80, 30, "bold 11pt Calibri", "white", "black", "gray", "r");
	tombol("Reset", 510,300, 80, 30, "bold 11pt Calibri", "white", "black", "gray", "r");

	//menggambar jejak mobil merah pada diagrams
	time = index/20.0;
	var jumlahTitik = Math.round(0.5*time+0.5);
	var vscale = graf.tileW/10;

	for (var i = 0; i < jumlahTitik; i++){
		x1 = xBase + vscale*(x1Init +v1*i*2 + 0.5*a1*i*i*4);
		lingkaran(x1, y1, radius/2, 1, "#000", "red"); 
	}

	//menambahkan mobil merah ke layar
	x1 = xBase + vscale*(x1Init +v1*time + 0.5*a1*time*time);
	gambar(dataGambar.mobil_merah, x1, y1-12);
	 
	//menggambar jejak mobil biru pada diagrams
	for (i = 0; i < jumlahTitik; i++){
		x2 = xBase + vscale*(x2Init +v2*i*2 + 0.5*a2*i*i*4);
		lingkaran(x2, y2, radius/2, 1, "#000", "blue");;
	}

	//menambahkan mobil biru ke layar
	x2 = xBase + vscale*(x2Init +v2*time + 0.5*a2*time*time);
	gambar(dataGambar.mobil_biru, x2, y2-12);

	//menambahkan teks  dan jarak
	var timeLabel = 'Waktu (t) = ';
	timeLabel = timeLabel + time.toFixed(2) + ' s';
	teks(timeLabel, 50, 120, "bold 14pt Calibri", "white", "left");
	var xPos = (x1Init +v1*time + 0.5*a1*time*time);
	var xPosLabel = 'd1 = ';
	xPosLabel = xPosLabel + xPos.toFixed(2) + ' m';
	teks(xPosLabel, 280, 370, "bold 14pt Calibri", "red", "left");
	var xPos2 = (x2Init +v2*time + 0.5*a2*time*time);
	xPosLabel = 'd2 = ';
	xPosLabel = xPosLabel + xPos2.toFixed(2) + ' m';
	teks(xPosLabel, 670, 370, "bold 14pt Calibri", "blue", "left");
}

function mouseDown(event){
	canvas.onmousemove = mouseDrag;
}

function mouseUp(event){
	//prosedure mengecek tombol
	var tombolAktif = cekTombol(event);
	if (tombolAktif != ""){
		if (tombolAktif == "Play"){
			window.clearTimeout(timer);
			simAktif = 1;
			jalankanSimulasi();
		}
		if (tombolAktif == "Reset"){
			reset();
		}
		if (tombolAktif == "Pause"){
			window.clearTimeout(timer);
			simAktif = 0;
		}
		if (tombolAktif == "<< Step"){
			window.clearTimeout(timer);
			index = index-5;
			if (index < 0) index = 0;
			time = index/20;
			simAktif = 1;
			setSimulasi();
		}
		if (tombolAktif == "Step >>"){
			window.clearTimeout(timer);
			if ((x1 < (xBase+graf.tileW*graf.dataW)) && (x2 < (xBase+graf.tileW*graf.dataW))){
				index = index+5;
				simAktif = 1;
				setSimulasi();
			}
		}
	}
	//menetralisir drag
	canvas.onmousemove = null;
}

function mouseDrag(event){
	//prosedur mengecek slider
	var sliderAktif = cekSlider(event);
	if (sliderAktif != null){
	if (sliderAktif.nama == "posisi1") x1Init = Number(sliderAktif.valS);
	if (sliderAktif.nama == "kecepatan1") v1 = Number(sliderAktif.valS);
	if (sliderAktif.nama == "acc1") a1 = Number(sliderAktif.valS);
	if (sliderAktif.nama == "posisi2") x2Init = Number(sliderAktif.valS);
	if (sliderAktif.nama == "kecepatan2") v2 = Number(sliderAktif.valS);
	if (sliderAktif.nama == "acc2") a2 = Number(sliderAktif.valS);
	//netralkan posisi objek ke awal
	index = 0;
	simAktif = 0;
	setSimulasi();
	}
}
function jalankanSimulasi() {
	setSimulasi();
	if (simAktif == 1) {
		timer = window.setTimeout(jalankanSimulasi, 20);
	}
}

function reset(){
	window.clearTimeout(timer);
	simAktif = 0;
	index = 0;
	time = 0.0;
	x1Init = 0;
	v1 = 5;
	a1 = 0;
	x2Init = 0;
	v2 = 5;
	a2 = 0;
	slider1.valS =  0;
	slider2.valS =  5;
	slider3.valS =  0;
	slider4.valS =  0;
	slider5.valS =  5;
	slider6.valS =  0;
	jalankanSimulasi();
}