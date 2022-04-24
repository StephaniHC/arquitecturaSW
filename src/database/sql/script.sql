
create table genero(
	nro serial not null primary key,
	nombre text not null
); 

insert into genero(nombre) values ('terror y sangre')returning nro;
insert into genero(nombre) values ('accion')returning nro;
insert into genero(nombre) values ('terror')returning nro;

create table pelicula(
	codigo serial not null primary key, 
	titulo text not null,
	duracion text not null, 
	nro_genero integer not null,
	foreign key (nro_genero) references genero(nro)
	on update cascade
	on delete cascade
);

insert into pelicula(titulo, duracion, nro_genero) values ('Son como niños', '1 hr', 1) returning codigo;
insert into pelicula(titulo, duracion, nro_genero) values ('Harry potter', '2 hrs ', 2) returning codigo;

create table alquiler(
	nro integer not null primary key, 
	fecha date not null,
	monto int not null
);

insert into alquiler(nro, fecha, monto) values (101, '2020/01/23', 20) returning nro;
insert into alquiler(nro, fecha, monto) values (102, '2020/01/23', 30) returning nro;

create table detalle (
	cod_pelicula integer not null references pelicula
	on update cascade
	on delete cascade,
	nro_alquiler integer not null references alquiler
	on update cascade
	on delete cascade
);

insert into detalle (cod_pelicula,nro_alquiler) values(5012,101);
insert into detalle (cod_pelicula,nro_alquiler) values(5003,101);

