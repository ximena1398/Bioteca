
CREATE DATABASE ProyectoFinalAdministracion;
	USE ProyectoFinalAdministracion;

	CREATE TABLE ROL(
	idrol SERIAL NOT NULL,
	nombrerol VARCHAR(15) NOT NULL
	);

	INSERT INTO rol(idrol, nombrerol) VALUES (1, 'usuario');
	INSERT INTO rol(idrol, nombrerol) VALUES (2, 'evaluador');
	INSERT INTO persona(nombres, apellidos, correo, contrasena, rol) VALUES ('administrador','admin','admin@gmail.com','1234','administrador');
	ALTER TABLE documento ADD CONSTRAINT fkdocumento_persona FOREIGN KEY (idpersona)
	REFERENCES persona(idpersona);

	CREATE TABLE ESTADO(
	idestado SERIAL NOT NULL,
	nombreestado VARCHAR(25) NOT NULL,
	intervalo VARCHAR(10) NOT NULL);

	INSERT INTO estado(nombreestado, intervalo) VALUES ('Publicable','4-5');
	INSERT INTO estado(nombreestado, intervalo) VALUES ('No publicable','1-2.9');
	INSERT INTO estado(nombreestado, intervalo) VALUES ('Requiere modificaciones','3-3.9');

	CREATE TABLE PERSONA(
	idpersona INT NOT NULL,
	nombres VARCHAR(45) NOT NULL,          
	apellidos VARCHAR(45) NULL,
	correo VARCHAR(45) NOT NULL,
	contrasena VARCHAR(45) NOT NULL);

	CREATE TABLE USUARIO(
	idpersona_usuario INT NOT NULL,
	programa VARCHAR(45) NOT NULL);

	CREATE TABLE CRITERIOSEVALUACION(
	idevaluacion INT NOT NULL,
	criterios INT NOT NULL,
	notas DECIMAL NOT NULL);

	CREATE TABLE EVALUACION(
	idevaluacion SERIAL NOT NULL,
	fechaevaluacion DATE NOT NULL,
	notafinal DECIMAL NOT NULL,
	iddocumento INT NOT NULL,
	idpersona_evaluador INT NOT NULL);

	CREATE TABLE EVALUADOR(
	idpersona_evaluador INT NOT NULL,
	titulo_profesional VARCHAR(45) NOT NULL);

	CREATE TABLE AUTORES(
	idautor INT NOT NULL,
	nombres_autor VARCHAR(45) NOT NULL,
	apellidos_autor VARCHAR(45) NOT NULL);

	CREATE TABLE AUTORESDOCUMENTO(
	autores_idautor INT NOT NULL,
	documento_iddocumento INT NOT NULL,
	estado_autor VARCHAR(15) NOT NULL);

	CREATE TABLE PALABRASCLAVE(
	idpalabras INT NOT NULL,
	nombre_palabras VARCHAR(45) NOT NULL);

	CREATE TABLE PALABRASDOCUMENTO(
	palabras_idpalabras INT NOT NULL,
	documento_iddocumento INT NOT NULL,
	contenido INT NOT NULL);

	CREATE TABLE DOCUMENTO(
	iddocumento INT NOT NULL,	
	titulo VARCHAR(150) NOT NULL,
	fecha_publicacion DATE NOT NULL,
	descripcion VARCHAR(200) NOT NULL,
	numero_edicion VARCHAR(20) NULL,
	usuario_idpersona_usuario INT NOT NULL,
	tipo_idtipo INT NOT NULL,
	documento_iddocumento INT NOT NULL);

	CREATE TABLE CLASIFICACION(
	idclasificacion INT NOT NULL,
	nombre_clasificacion VARCHAR(30) NOT NULL);

	CREATE TABLE DOCUMENTOCLASIFICACION(
	documento_iddocumento INT NOT NULL,
	clasificacion_idclasificacion INT NOT NULL,
	porcentaje_clasificacion INT NOT NULL);

	CREATE TABLE DESCARGA_USUARIODOCUMENTO(
	iddescarga INT NOT NULL,
	fecha_descarga DATE NOT NULL,
	usuario_idpersona_usuario INT NOT NULL,
	documento_iddocumento INT NOT NULL);

	CREATE TABLE TIPO(
	idtipo INT NOT NULL,
	nombre_tipo VARCHAR(45) NOT NULL);

	CREATE TABLE CRITERIOS(
	idcriterios INT NOT NULL,
	nombre_criterios VARCHAR(45) NOT NULL);

	CREATE TABLE TIPOCRITERIOS(
	tipo_idtipo INT NOT NULL,
	criterios_idcriterios INT NOT NULL,
	porcentaje_valor DECIMAL NOT NULL);

	CREATE TABLE ESTADO(
	idestado INT NOT NULL,
	nombre_estado VARCHAR(25) NOT NULL,
	intervalo VARCHAR(10) NOT NULL);

	CREATE TABLE EVALUACION(
	idevaluacion INT NOT NULL,
	fecha_evaluacion DATE NOT NULL,
	nota_final DECIMAL NOT NULL,
	comentarios VARCHAR(200) NOT NULL,
	documento_iddocumento INT NOT NULL,
	estado_idestado INT NOT NULL,
	evaluador_idpersona_evaluador INT NOT NULL);

	CREATE TABLE TIPOCRITERIOSEVALUACION(
	evaluacion_idevaluacion INT NOT NULL,
	tipo_idtipo INT NOT NULL,
	criterios_idcriterios INT NOT NULL,
	notas DECIMAL NOT NULL);

	CREATE TABLE PORCENTAJE(
	nota_porcentaje DECIMAL NOT NULL);


	ALTER TABLE PERSONA ADD CONSTRAINT pk_persona PRIMARY KEY (idpersona);

	ALTER TABLE USUARIO ADD CONSTRAINT pk_usuario PRIMARY KEY (idpersona_usuario);

	ALTER TABLE EVALUADOR ADD CONSTRAINT pk_evaluador PRIMARY KEY (idpersona_evaluador);

	ALTER TABLE AUTORES ADD CONSTRAINT pk_autores PRIMARY KEY (idautor);

	ALTER TABLE PALABRASCLAVE ADD CONSTRAINT pk_palabras PRIMARY KEY (idpalabras);

	ALTER TABLE TIPO ADD CONSTRAINT pk_tipo PRIMARY KEY (idtipo);

	ALTER TABLE DOCUMENTO ADD CONSTRAINT pk_documento PRIMARY KEY (iddocumento);

	ALTER TABLE AUTORESDOCUMENTO ADD CONSTRAINT pk_autoresdocumento PRIMARY KEY (autores_idautor, documento_iddocumento);

	ALTER TABLE PALABRASDOCUMENTO ADD CONSTRAINT pk_palabrasdocumento PRIMARY KEY (palabras_idpalabras, documento_iddocumento);

	ALTER TABLE CLASIFICACION ADD CONSTRAINT pk_clasificacion PRIMARY KEY (idclasificacion);

	ALTER TABLE DOCUMENTOCLASIFICACION ADD CONSTRAINT pk_documentoclasificacion PRIMARY KEY (documento_iddocumento, clasificacion_idclasificacion);

	ALTER TABLE DESCARGA_USUARIODOCUMENTO ADD CONSTRAINT pk_descarga PRIMARY KEY (iddescarga);

	ALTER TABLE CRITERIOS ADD CONSTRAINT pk_criterios PRIMARY KEY (idcriterios);

	ALTER TABLE TIPOCRITERIOS ADD CONSTRAINT pk_tipocriterios PRIMARY KEY (criterios_idcriterios, tipo_idtipo);

	ALTER TABLE ESTADO ADD CONSTRAINT pk_estado PRIMARY KEY (idestado);

	ALTER TABLE EVALUACION ADD CONSTRAINT pk_evaluacion PRIMARY KEY (idevaluacion);

	ALTER TABLE TIPOCRITERIOSEVALUACION ADD CONSTRAINT pk_tipocriteriosevaluacion PRIMARY KEY (evaluacion_idevaluacion, tipo_idtipo, criterios_idcriterios);

	

	ALTER TABLE USUARIO ADD CONSTRAINT fkpersona_usuario FOREIGN KEY (idpersona_usuario)
	REFERENCES PERSONA(idpersona);

	ALTER TABLE EVALUADOR ADD CONSTRAINT fkpersona_evaluador FOREIGN KEY (idpersona_evaluador)
	REFERENCES PERSONA(idpersona);

	ALTER TABLE AUTORESDOCUMENTO ADD CONSTRAINT fkautoresdocumento_autor FOREIGN KEY (autores_idautor)
	REFERENCES AUTORES(idautor);

	ALTER TABLE AUTORESDOCUMENTO ADD CONSTRAINT fkautoresdocumento_documento FOREIGN KEY (documento_iddocumento)
	REFERENCES DOCUMENTO(iddocumento);

	ALTER TABLE PALABRASDOCUMENTO ADD CONSTRAINT fkpalabrasdocumento_palabras FOREIGN KEY (palabras_idpalabras)
	REFERENCES PALABRASCLAVE(idpalabras);

	ALTER TABLE PALABRASDOCUMENTO ADD CONSTRAINT fkpalabrasdocumento_documento FOREIGN KEY (documento_iddocumento)
	REFERENCES DOCUMENTO(iddocumento);

	ALTER TABLE DOCUMENTO ADD CONSTRAINT fkdocumento_persona FOREIGN KEY (usuario_idpersona_usuario)
	REFERENCES USUARIO(idpersona_usuario);

	ALTER TABLE DOCUMENTO ADD CONSTRAINT fkdocumento_tipo FOREIGN KEY (tipo_idtipo)
	REFERENCES TIPO(idtipo);

	ALTER TABLE DOCUMENTO ADD CONSTRAINT fkdocumento_documento FOREIGN KEY (documento_iddocumento)
	REFERENCES DOCUMENTO(iddocumento);

	ALTER TABLE DOCUMENTOCLASIFICACION ADD CONSTRAINT fkdocumentoclasificacion_documento FOREIGN KEY (documento_iddocumento)
	REFERENCES DOCUMENTO(iddocumento);

	ALTER TABLE DOCUMENTOCLASIFICACION ADD CONSTRAINT fkdocumentoclasificacion_clasificacion FOREIGN KEY (clasificacion_idclasificacion)
	REFERENCES CLASIFICACION(idclasificacion);

	ALTER TABLE DESCARGA_USUARIODOCUMENTO ADD CONSTRAINT fkdescarga_usuario FOREIGN KEY (usuario_idpersona_usuario)
	REFERENCES USUARIO(idpersona_usuario);

	ALTER TABLE DESCARGA_USUARIODOCUMENTO ADD CONSTRAINT fkdescarga_documento FOREIGN KEY (documento_iddocumento)
	REFERENCES DOCUMENTO(iddocumento);

	ALTER TABLE TIPOCRITERIOS ADD CONSTRAINT fktipocriterios_criterios FOREIGN KEY (criterios_idcriterios)
	REFERENCES CRITERIOS(idcriterios);

	ALTER TABLE TIPOCRITERIOS ADD CONSTRAINT fktipocriterios_tipo FOREIGN KEY (tipo_idtipo)
	REFERENCES TIPO(idtipo);

	ALTER TABLE EVALUACION ADD CONSTRAINT fkevaluacion_documento FOREIGN KEY (documento_iddocumento)
	REFERENCES DOCUMENTO(iddocumento);

	ALTER TABLE EVALUACION ADD CONSTRAINT fkevaluacion_estado FOREIGN KEY (estado_idestado)
	REFERENCES ESTADO(idestado);

	ALTER TABLE EVALUACION ADD CONSTRAINT fkevaluacion_evaluador FOREIGN KEY (evaluador_idpersona_evaluador)
	REFERENCES EVALUADOR(idpersona_evaluador);

	ALTER TABLE TIPOCRITERIOSEVALUACION ADD CONSTRAINT fktipocriteriosevaluacion_evaluacion FOREIGN KEY (evaluacion_idevaluacion)
	REFERENCES EVALUACION(idevaluacion);

	ALTER TABLE TIPOCRITERIOSEVALUACION ADD CONSTRAINT fktipocriteriosevaluacion_tipo FOREIGN KEY (tipo_idtipo)
	REFERENCES TIPO(idtipo);

	ALTER TABLE TIPOCRITERIOSEVALUACION ADD CONSTRAINT fktipocriteriosevaluacion_criterios FOREIGN KEY (criterios_idcriterios)
	REFERENCES CRITERIOS(idcriterios);

	
	/*create trigger porcentaje before insert on tipocriteriosevaluacion
	for each row
	update tipocriteriosevaluacion
	inner join tipocriterios
	on tipocriterios.tipo_idtipo=tipocriteriosevaluacion.tipo_idtipo and tipocriterios.criterios_idcriterios=tipocriteriosevaluacion.criterios_idcriterios
	set new.notas=new.notas*tipocriterios.porcentaje_valor;*/


	/*CREATE TRIGGER trigger_porcentaje AFTER INSERT
	ON tipocriteriosevaluacion
	FOR EACH ROW
	INSERT INTO PORCENTAJE 
	VALUES (NEW.notas*2);*/

	/*CREATE TRIGGER trigger_porcentaje AFTER INSERT
	ON tipocriteriosevaluacion
	FOR EACH ROW
	INSERT INTO PORCENTAJE (new.notas)
	select tipocriterios.porcentaje_valor from tipocriterios
	inner join tipocriteriosevaluacion
	on tipocriteriosevaluacion.tipo_idtipo=tipocriterios.tipo_idtipo
	and tipocriteriosevaluacion.criterios_idcriterios=tipocriterios.criterios_idcriterios
	inner join evaluacion 
	on evaluacion.idevaluacion=tipocriteriosevaluacion.evaluacion_idevaluacion
	where tipocriteriosevaluacion.notas=(tipocriteriosevaluacion.notas*2) and tipocriteriosevaluacion.notas=new.notas;*/
	
	


	INSERT INTO PERSONA
	VALUES (1,'Maria Alejandra','Murcia Cometa','ma@gmail.com','hd8ye');

	INSERT INTO PERSONA
	VALUES (2,'Ximena','Medina Correa','xi@gmail.com','gs9e3');

	INSERT INTO PERSONA
	VALUES (3,'leída','Martinez Sanchez','lema@gmail.com','hs8r2');

	INSERT INTO PERSONA
	VALUES (4,'Yubely','Paez Romero','yupa@gmail.com','nc6sy');

	INSERT INTO PERSONA
	VALUES (5,'Yamile','Rincon Sierra','yari@gmail.com','gs7ew');

	INSERT INTO PERSONA
	VALUES (6,'Kevin','Plaza Cabrera','kepla@gmail.com','asp5b');

	INSERT INTO PERSONA
	VALUES (7,'Jonathan','Carvajal','jhoca@gmail.com','gd645');

	INSERT INTO PERSONA
	VALUES (8,'Janiel','Medina Claros','jame@gmail.com','64hts');

	INSERT INTO PERSONA
	VALUES (9,'Juan Camilo','Ospitia Triviño','caos@gmail.com','kd83g');

	INSERT INTO PERSONA
	VALUES (10,'Jose Manuel','Ruiz','joru@gmail.com','ba5fe');

	INSERT INTO PERSONA
	VALUES (11,'Yeimi Cenaida','Castañeda Cardozo','yeca@gmail.com','ksa72');

	INSERT INTO PERSONA
	VALUES (12,'Leidy Johana','Ramirez','lera@gmail.com','bc63b');

	INSERT INTO PERSONA
	VALUES (13,'Daniel','Silva','dasi@gmail.com','83gd6');

	INSERT INTO PERSONA
	VALUES (14,'Valentina','Camacho','vac@gmail.com','te7f5');

	INSERT INTO PERSONA
	VALUES (15,'Rosa Angelica','Cruz','rocru@gmail.com','73tdv');

	INSERT INTO PERSONA
	VALUES (16,'Jenniffer Maritza','Perez Daza','jhepe@gmail.com','hwq63');

	INSERT INTO PERSONA
	VALUES (17,'Natalia','Medina España','name@gmail.com','84txn');

	INSERT INTO PERSONA
	VALUES (18,'Maria Isabel','Gamboa','maga@gmail.com','bc4qg');

	INSERT INTO PERSONA
	VALUES (19,'Karen Geraldine','Villarreal','kavi@gmail.com','64t5u');

	INSERT INTO PERSONA
	VALUES (20,'Alejandro','Guevara','ague@gmail.com','63gd5');



	INSERT INTO USUARIO
	VALUES(1,'Biología');
	
	INSERT INTO USUARIO
	VALUES(2,'Medicina Veterinaria y Zootecnia');

	INSERT INTO USUARIO
	VALUES(3,'Biología');

	INSERT INTO USUARIO
	VALUES(4,'Ingeniería Agroecológica');

	INSERT INTO USUARIO
	VALUES(5,'Medicina Veterinaria y Zootecnia');

	INSERT INTO USUARIO
	VALUES(6,'Biología');

	INSERT INTO USUARIO
	VALUES(7,'Biología');

	INSERT INTO USUARIO
	VALUES(8,'Ingeniería Agroecológica');

	INSERT INTO USUARIO
	VALUES(9,'Biología');

	INSERT INTO USUARIO
	VALUES(10,'Medicina Veterinaria y Zootecnia');

	INSERT INTO USUARIO
	VALUES(11,'Biología');

	INSERT INTO USUARIO
	VALUES(12,'Biología');

	INSERT INTO USUARIO
	VALUES(13,'Biología');

	INSERT INTO USUARIO
	VALUES(14,'Biología');

	INSERT INTO USUARIO
	VALUES(15,'Ingeniería Agroecológica');



	INSERT INTO EVALUADOR
	VALUES(16,'Biólogo');

	INSERT INTO EVALUADOR
	VALUES(17,'Biólogo');

	INSERT INTO EVALUADOR
	VALUES(18,'Licenciado en lengua castellana');

	INSERT INTO EVALUADOR
	VALUES(19,'Magister en investigaciones');

	INSERT INTO EVALUADOR
	VALUES(20,'Biólogo');



	INSERT INTO TIPO
	VALUES(1,'Artículo');

	INSERT INTO TIPO
	VALUES(2,'Libro');

	INSERT INTO TIPO
	VALUES(3,'Revista');



	INSERT INTO DOCUMENTO
	VALUES(1,'Eficiencia energética','2017/01/13','Descripción 1','segunda',3,3,1);

	INSERT INTO DOCUMENTO
	VALUES(2,'Biología','2007/06/21','Descripción 2','séptima',6,2,2);

	INSERT INTO DOCUMENTO
	VALUES(3,'Pueblos indígenas y cambio climático','2009/10/01','Descripción 3',null,9,1,3);

	INSERT INTO DOCUMENTO
	VALUES(4,'Microalgas acuáticas de la Amazonia','2000/09/12','Descripción 4','primera',12,1,4);

	INSERT INTO DOCUMENTO
	VALUES(5,'Microalgas acuáticas: la otra escala','2008/12/02','Descripción 5','segunda',15,1,4);


	

	INSERT INTO AUTORES
	VALUES(1,'Julián Alejandro','Cruz Cruz');

	INSERT INTO AUTORES
	VALUES(2,'Neil A','Campbell');

	INSERT INTO AUTORES
	VALUES(3,'Jane B','Reece');

	INSERT INTO AUTORES
	VALUES(4,'Juan Alvaro','Echeverri');

	INSERT INTO AUTORES
	VALUES(5,'Santiago','Duque');

	INSERT INTO AUTORES
	VALUES(6,'Marcela','Nuñez Avellaneda');



	INSERT INTO AUTORESDOCUMENTO
	VALUES(1,1,'Principal');

	INSERT INTO AUTORESDOCUMENTO
	VALUES(2,2,'Principal');

	INSERT INTO AUTORESDOCUMENTO
	VALUES(3,2,'Colaborador');

	INSERT INTO AUTORESDOCUMENTO
	VALUES(4,3,'Principal');

	INSERT INTO AUTORESDOCUMENTO
	VALUES(5,4,'Colaborador');

	INSERT INTO AUTORESDOCUMENTO
	VALUES(6,4,'Principal');

	INSERT INTO AUTORESDOCUMENTO
	VALUES(6,5,'Principal');



	INSERT INTO PALABRASCLAVE
	VALUES(1,'Energética');

	INSERT INTO PALABRASCLAVE
	VALUES(2,'Medio ambiente');

	INSERT INTO PALABRASCLAVE
	VALUES(3,'Célula');

	INSERT INTO PALABRASCLAVE
	VALUES(4,'Genética');

	INSERT INTO PALABRASCLAVE
	VALUES(5,'Diversidad biológica');

	INSERT INTO PALABRASCLAVE
	VALUES(6,'Cambio climático');

	INSERT INTO PALABRASCLAVE
	VALUES(7,'Amazonia Colombiana');

	INSERT INTO PALABRASCLAVE
	VALUES(8,'Pueblos indígenas');

	INSERT INTO PALABRASCLAVE
	VALUES(9,'Microalgas');

	INSERT INTO PALABRASCLAVE
	VALUES(10,'Humedales');

	INSERT INTO PALABRASCLAVE
	VALUES(11,'Nivel trófico');



	INSERT INTO PALABRASDOCUMENTO
	VALUES(1,1,60);

	INSERT INTO PALABRASDOCUMENTO
	VALUES(2,1,40);

	INSERT INTO PALABRASDOCUMENTO
	VALUES(3,2,20);

	INSERT INTO PALABRASDOCUMENTO
	VALUES(4,2,40);

	INSERT INTO PALABRASDOCUMENTO
	VALUES(5,2,40);

	INSERT INTO PALABRASDOCUMENTO
	VALUES(6,3,30);

	INSERT INTO PALABRASDOCUMENTO
	VALUES(7,3,40);

	INSERT INTO PALABRASDOCUMENTO
	VALUES(8,3,30);

	INSERT INTO PALABRASDOCUMENTO
	VALUES(9,4,40);

	INSERT INTO PALABRASDOCUMENTO
	VALUES(7,4,40);

	INSERT INTO PALABRASDOCUMENTO
	VALUES(11,4,20);

	INSERT INTO PALABRASDOCUMENTO
	VALUES(9,5,50);

	INSERT INTO PALABRASDOCUMENTO
	VALUES(7,5,50);
	


	INSERT INTO CLASIFICACION
	VALUES(1,'Ecología');

	INSERT INTO CLASIFICACION
	VALUES(2,'Botánica');

	INSERT INTO CLASIFICACION
	VALUES(3,'Zoología');

	INSERT INTO CLASIFICACION
	VALUES(4,'Amazonía');

	INSERT INTO CLASIFICACION
	VALUES(5,'Genética');

	INSERT INTO CLASIFICACION
	VALUES(6,'Conservación');

	INSERT INTO CLASIFICACION
	VALUES(7,'Plantas');

	INSERT INTO CLASIFICACION
	VALUES(8,'Animales');



	INSERT INTO DOCUMENTOCLASIFICACION
	VALUES(1,1,100);

	INSERT INTO DOCUMENTOCLASIFICACION
	VALUES(2,1,70);

	INSERT INTO DOCUMENTOCLASIFICACION
	VALUES(2,5,30);

	INSERT INTO DOCUMENTOCLASIFICACION
	VALUES(3,4,50);

	INSERT INTO DOCUMENTOCLASIFICACION
	VALUES(3,6,50);

	INSERT INTO DOCUMENTOCLASIFICACION
	VALUES(4,4,30);

	INSERT INTO DOCUMENTOCLASIFICACION
	VALUES(4,7,70);

	INSERT INTO DOCUMENTOCLASIFICACION
	VALUES(5,4,60);

	INSERT INTO DOCUMENTOCLASIFICACION
	VALUES(5,7,40);



	INSERT INTO DESCARGA_USUARIODOCUMENTO
	VALUES(1,'2019/10/20',3,4);

	INSERT INTO DESCARGA_USUARIODOCUMENTO
	VALUES(2,'2019/10/21',4,4);

	INSERT INTO DESCARGA_USUARIODOCUMENTO
	VALUES(3,'2019/10/23',10,4);

	INSERT INTO DESCARGA_USUARIODOCUMENTO
	VALUES(4,'2019/10/26',13,4);

	

	INSERT INTO CRITERIOS
	VALUES(1,'Calidad contenido');

	INSERT INTO CRITERIOS
	VALUES(2,'Notoriedad autores');

	INSERT INTO CRITERIOS
	VALUES(3,'Citas');

	INSERT INTO CRITERIOS
	VALUES(4,'Estructura artículos');

	INSERT INTO CRITERIOS
	VALUES(5,'Temática original');

	INSERT INTO CRITERIOS
	VALUES(6,'Estructura libros');

	INSERT INTO CRITERIOS
	VALUES(7,'Estabilidad revista');

	INSERT INTO CRITERIOS
	VALUES(8,'Contenido científico');

	INSERT INTO CRITERIOS
	VALUES(9,'Contribuciones revista');

	INSERT INTO CRITERIOS
	VALUES(10,'Coherencia temática');



	INSERT INTO TIPOCRITERIOS
	VALUES(1,1,0.3);

	INSERT INTO TIPOCRITERIOS
	VALUES(1,2,0.1);

	INSERT INTO TIPOCRITERIOS
	VALUES(1,3,0.2);

	INSERT INTO TIPOCRITERIOS
	VALUES(1,4,0.2);

	INSERT INTO TIPOCRITERIOS
	VALUES(1,10,0.2);

	INSERT INTO TIPOCRITERIOS
	VALUES(2,5,0.6);

	INSERT INTO TIPOCRITERIOS
	VALUES(2,6,0.2);

	INSERT INTO TIPOCRITERIOS
	VALUES(2,10,0.2);

	INSERT INTO TIPOCRITERIOS
	VALUES(3,7,0.2);

	INSERT INTO TIPOCRITERIOS
	VALUES(3,8,0.2);

	INSERT INTO TIPOCRITERIOS
	VALUES(3,9,0.2);

	INSERT INTO TIPOCRITERIOS
	VALUES(3,5,0.2);

	INSERT INTO TIPOCRITERIOS
	VALUES(3,10,0.2);
	


	INSERT INTO ESTADO
	VALUES(1,'Publicable','4-5');

	INSERT INTO ESTADO
	VALUES(2,'No publicable','1-2.9');

	INSERT INTO ESTADO
	VALUES(3,'Requiere modificaciones','3-3.9');



	INSERT INTO EVALUACION
	VALUES(1,'2019/10/25',0,'Felicitaciones',1,1,16);

	INSERT INTO EVALUACION
	VALUES(2,'2019/09/25',0,'Felicitaciones',2,1,18);

	INSERT INTO EVALUACION
	VALUES(3,'2019/10/26',0,'No cumple con los criterios establecidos',3,2,19);

	INSERT INTO EVALUACION
	VALUES(4,'2019/10/26',0,'Agregar citas',5,3,18);


	
	INSERT INTO TIPOCRITERIOSEVALUACION
	VALUES(1,3,7,0.8);

	INSERT INTO TIPOCRITERIOSEVALUACION
	VALUES(1,3,8,1);

	INSERT INTO TIPOCRITERIOSEVALUACION
	VALUES(1,3,9,0.8);

	INSERT INTO TIPOCRITERIOSEVALUACION
	VALUES(1,3,5,0.8);

	INSERT INTO TIPOCRITERIOSEVALUACION
	VALUES(1,3,10,1);


	INSERT INTO TIPOCRITERIOSEVALUACION
	VALUES(2,2,5,2.7);

	INSERT INTO TIPOCRITERIOSEVALUACION
	VALUES(2,2,6,1);

	INSERT INTO TIPOCRITERIOSEVALUACION
	VALUES(2,2,10,1);


	INSERT INTO TIPOCRITERIOSEVALUACION
	VALUES(3,1,1,0.6);

	INSERT INTO TIPOCRITERIOSEVALUACION
	VALUES(3,1,2,0.3);

	INSERT INTO TIPOCRITERIOSEVALUACION
	VALUES(3,1,3,0.5);

	INSERT INTO TIPOCRITERIOSEVALUACION
	VALUES(3,1,4,0.4);

	INSERT INTO TIPOCRITERIOSEVALUACION
	VALUES(3,1,10,0.5);


	INSERT INTO TIPOCRITERIOSEVALUACION
	VALUES(4,1,1,0.9);

	INSERT INTO TIPOCRITERIOSEVALUACION
	VALUES(4,1,2,0.31);

	INSERT INTO TIPOCRITERIOSEVALUACION
	VALUES(4,1,3,0.76);

	INSERT INTO TIPOCRITERIOSEVALUACION
	VALUES(4,1,4,0.76);

	INSERT INTO TIPOCRITERIOSEVALUACION
	VALUES(4,1,10,0.76);




/*CONSULTAS*/

	SELECT PERSONA.idpersona, PERSONA.nombres, PERSONA.apellidos, PERSONA.correo, PERSONA.contrasena
	FROM DOCUMENTO
	INNER JOIN USUARIO
	ON DOCUMENTO.usuario_idpersona_usuario=USUARIO.idpersona_usuario
	INNER JOIN PERSONA
	ON USUARIO.idpersona_usuario=PERSONA.idpersona
	INNER JOIN EVALUACION 
	ON EVALUACION.documento_iddocumento=DOCUMENTO.iddocumento
	WHERE EVALUACION.fecha_evaluacion BETWEEN '2019/10/01' AND '2019/10/31'
	ORDER BY PERSONA.idpersona ASC;

	SELECT DOCUMENTO.iddocumento, DOCUMENTO.titulo,EVALUACION.nota_final,
	CASE 
	WHEN(TIPOCRITERIOS.criterios_idcriterios=10)THEN
		CASE		
		WHEN(EVALUACION.estado_idestado=1)THEN
		EVALUACION.nota_final-(EVALUACION.nota_final*0.05)
		WHEN(EVALUACION.estado_idestado=2)THEN
		EVALUACION.nota_final-(EVALUACION.nota_final*0.15)
		WHEN(EVALUACION.estado_idestado=3)THEN
		EVALUACION.nota_final-(EVALUACION.nota_final*0.1)
		END
	END AS nota_modificada
	FROM EVALUACION
	INNER JOIN DOCUMENTO
	ON EVALUACION.documento_iddocumento=DOCUMENTO.iddocumento
	INNER JOIN TIPOCRITERIOSEVALUACION
	ON TIPOCRITERIOSEVALUACION.evaluacion_idevaluacion=EVALUACION.idevaluacion
	INNER JOIN TIPOCRITERIOS
	ON TIPOCRITERIOSEVALUACION.criterios_idcriterios=TIPOCRITERIOS.criterios_idcriterios
	GROUP BY DOCUMENTO.iddocumento,nota_modificada, EVALUACION.idevaluacion
	ORDER BY DOCUMENTO.iddocumento;


	SELECT DOCUMENTO.iddocumento, DOCUMENTO.titulo, CLASIFICACION.nombre_clasificacion
	FROM DOCUMENTO
	INNER JOIN DOCUMENTOCLASIFICACION
	ON DOCUMENTOCLASIFICACION.documento_iddocumento=DOCUMENTO.iddocumento
	INNER JOIN CLASIFICACION
	ON DOCUMENTOCLASIFICACION.clasificacion_idclasificacion=CLASIFICACION.idclasificacion
	WHERE CLASIFICACION.nombre_clasificacion ='plantas'	
	ORDER BY DOCUMENTO.iddocumento ASC;


	SELECT DOCUMENTO.iddocumento, DOCUMENTO.titulo
	FROM DOCUMENTO 
	LEFT JOIN EVALUACION
	ON EVALUACION.documento_iddocumento=DOCUMENTO.iddocumento
	WHERE EVALUACION.documento_iddocumento IS NULL
	ORDER BY DOCUMENTO.iddocumento ASC;


	SELECT DOCUMENTO.iddocumento, DOCUMENTO.titulo, DOCUMENTO.fecha_publicacion, DOCUMENTO.numero_edicion,EVALUACION.nota_final
	FROM EVALUACION
	INNER JOIN DOCUMENTO
	ON EVALUACION.documento_iddocumento=DOCUMENTO.iddocumento
	INNER JOIN TIPOCRITERIOSEVALUACION
	ON TIPOCRITERIOSEVALUACION.evaluacion_idevaluacion=EVALUACION.idevaluacion
	WHERE TIPOCRITERIOSEVALUACION.criterios_idcriterios=10 AND TIPOCRITERIOSEVALUACION.notas>0.3
	ORDER BY DOCUMENTO.iddocumento ASC;

