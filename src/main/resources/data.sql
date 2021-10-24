insert into Station(active, station_name, id) values (true, 'Trabzon', 1);
insert into Station(active, station_name, id) values (true, 'Rize', 2);
insert into Station(active, station_name, id) values (true, 'Samsun', 3);
insert into Station(active, station_name, id) values (true, 'Ankara', 4);
insert into Station(active, station_name, id) values (true, 'Antalya', 5);
insert into Station(active, station_name, id) values (true, 'Konya', 6);
insert into Station(active, station_name, id) values (true, 'Afyon', 7);
insert into Station(active, station_name, id) values (true, 'Ordu', 8);
insert into Station(active, station_name, id) values (true, 'Giresun', 9);

insert into Route(active, route_name, id) values (true, 'Trabzon-Rize', 1);
insert into Route(active, route_name, id) values (true, 'Rize-Samsun', 2);
insert into Route(active, route_name, id) values (true, 'Samsun-Ankara', 3);
insert into Route(active, route_name, id) values (true, 'Ankara-Antalya', 4);
insert into Route(active, route_name, id) values (true, 'Antalya-Trabzon', 5);

insert into Vehicle(active, vehicle_name,plate, id) values (true, 'Mecedes','06 AY 88', 1);
insert into Vehicle(active, vehicle_name,plate, id) values (true, 'Audi','06 TD 89', 2);
insert into Vehicle(active, vehicle_name,plate, id) values (true, 'Honda','06 SKB 87', 3);
insert into Vehicle(active, vehicle_name,plate, id) values (true, 'Hyundai','06 BFD 499', 4);
insert into Vehicle(active, vehicle_name,plate, id) values (true, 'Toyota','06 ECK 091', 5);
insert into Vehicle(active, vehicle_name,plate, id) values (true, 'Bogata','06 AKG 0076', 6);
insert into Vehicle(active, vehicle_name,plate, id) values (true, 'Mitsubishi','06 ICT 2021', 7);

insert into User(Id,name,username,email,password,active) values(1,'smartICT','smart','smart@ict','$2a$10$H/birFfHPzC8iBIaBA0IKeniaE0tomP/WpzHFL2ut.Kxf.JOqBzUK',true);