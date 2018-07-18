CREATE SCHEMA WTT;

CREATE TABLE wtt.employee (
employee_id integer NOT NULL,
department_id integer NOT NULL,
firstname character varying(200) NOT NULL,
lastname character varying(200) NOT NULL,
email character varying(150) NOT NULL,
employee_code character varying(12) NOT NULL,
key character varying(150) NOT NULL,
isactive character(1) DEFAULT 'Y'::bpchar NOT NULL,
isreference character(1) DEFAULT 'N'::bpchar NOT NULL,
created timestamp without time zone DEFAULT now() NOT NULL,
createdby integer NOT NULL,
updated timestamp without time zone DEFAULT now() NOT NULL,
updatedby integer NOT NULL
);

CREATE TABLE WTT.DEPARTMENT(
department_id integer NOT NULL,
name character varying(200) NOT NULL,
description character varying(200) NOT NULL,
isactive character(1) DEFAULT 'Y'::bpchar NOT NULL,
isreference character(1) DEFAULT 'N'::bpchar NOT NULL,
created timestamp without time zone DEFAULT now() NOT NULL,
createdby integer NOT NULL,
updated timestamp without time zone DEFAULT now() NOT NULL,
updatedby integer NOT NULL
);

ALTER TABLE wtt.employee
 ADD CONSTRAINT department_id_fk FOREIGN KEY (department_id) REFERENCES department(department_id);
