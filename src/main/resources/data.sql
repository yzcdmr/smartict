insert into Station(active, station_name, id) values (true, 'Trabzon', 1);
insert into Station(active, station_name, id) values (true, 'Rize', 2);
insert into Station(active, station_name, id) values (true, 'Samsun', 3);
insert into Station(active, station_name, id) values (true, 'Ankara', 4);
insert into Station(active, station_name, id) values (true, 'Antalya', 5);

insert into Route(active, route_name, id) values (true, 'Trabzon-Rize', 1);
insert into Route(active, route_name, id) values (true, 'Rize-Samsun', 2);
insert into Route(active, route_name, id) values (true, 'Samsun-Ankara', 3);
insert into Route(active, route_name, id) values (true, 'Ankara-Antalya', 4);
insert into Route(active, route_name, id) values (true, 'Antalya-Trabzon', 5);

insert into Vehicle(active, vehicle_name, id) values (true, 'Ucak', 1);
insert into Vehicle(active, vehicle_name, id) values (true, 'Araba', 2);
insert into Vehicle(active, vehicle_name, id) values (true, 'Tren', 3);
insert into Vehicle(active, vehicle_name, id) values (true, 'Otobus', 4);
insert into Vehicle(active, vehicle_name, id) values (true, 'Gemi', 5);

-- insert into Vehicle(VEHICLE_ID,VEHICLE_NAME,PLATE,MODEL,MODEL_YEAR,STATUS) values(1,'532 BUS','06 D 0071','Mercedes',2015,true);
-- insert into Vehicle(VEHICLE_ID,VEHICLE_NAME,PLATE,MODEL,MODEL_YEAR,STATUS) values(2,'566 BUS','06 D 0072','Mercedes',2018,true);
-- insert into Vehicle(VEHICLE_ID,VEHICLE_NAME,PLATE,MODEL,MODEL_YEAR,STATUS) values(3,'500 BUS','06 D 0073','Mercedes',2019,true);
--
-- insert into Route(ROUTE_ID,ROUTE_NAME,STATUS) values(1,'KIZILAY',true);
-- insert into Route(ROUTE_ID,ROUTE_NAME,STATUS) values(2,'BATIKENT',true);
-- insert into Route(ROUTE_ID,ROUTE_NAME,STATUS) values(3,'Simsoft',true);
--
--
-- insert into ROUTE_STATION(ROUTE_STATION_ID,STATION_ID,ROUTE_ID,STATUS) values(1,1,3,true);
-- insert into ROUTE_STATION(ROUTE_STATION_ID,STATION_ID,ROUTE_ID,STATUS) values(2,2,3,true);
-- insert into ROUTE_STATION(ROUTE_STATION_ID,STATION_ID,ROUTE_ID,STATUS) values(3,5,3,true);
-- insert into ROUTE_STATION(ROUTE_STATION_ID,STATION_ID,ROUTE_ID,STATUS) values(4,6,3,true);
--
-- insert into ROUTE_VEHICLE(ROUTE_VEHICLE_ID,VEHICLE_ID,ROUTE_ID,STATUS) values(1,1,3,true);

insert into User(Id,name,username,email,password,active) values(1,'smartICT','smart','smart@ict','$2a$10$H/birFfHPzC8iBIaBA0IKeniaE0tomP/WpzHFL2ut.Kxf.JOqBzUK',true);