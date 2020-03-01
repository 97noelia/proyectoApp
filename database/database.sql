-- phpMyAdmin SQL Dump
-- version 4.8.3
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 24-01-2020 a las 20:28:20
-- Versión del servidor: 10.1.35-MariaDB
-- Versión de PHP: 7.2.9

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `proyectoapp`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `busquedas_favoritas`
--

CREATE TABLE `busquedas_favoritas` (
  `id_favorito` int(11) NOT NULL,
  `búsquedas_idbúsquedas` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `búsquedas`
--

CREATE TABLE `búsquedas` (
  `idbúsquedas` int(11) NOT NULL,
  `lugar_salida` varchar(100) DEFAULT NULL,
  `lugar_llegada` varchar(100) DEFAULT NULL,
  `hora_salida` time DEFAULT NULL,
  `hora_llegada` time DEFAULT NULL,
  `Usuario_idUsuario` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `carrito-ruta`
--

CREATE TABLE `carrito-ruta` (
  `Usuario_idUsuario` int(11) NOT NULL,
  `coche_idcoche` int(11) NOT NULL,
  `ruta_idruta` int(11) NOT NULL,
  `id` int(11) NOT NULL,
  `fecha` date DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `coche`
--

CREATE TABLE `coche` (
  `idcoche` int(11) NOT NULL,
  `matricula` varchar(45) DEFAULT NULL,
  `modelo` varchar(45) DEFAULT NULL,
  `tipo_seguro` varchar(45) DEFAULT NULL,
  `combustible` varchar(45) DEFAULT NULL,
  `num_plazas` int(11) DEFAULT NULL,
  `silla_bebe` int(11) DEFAULT NULL,
  `Usuario_idUsuario` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `geolocalizacion`
--

CREATE TABLE `geolocalizacion` (
  `idgeolocalizacion` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `mensaje_emisor`
--

CREATE TABLE `mensaje_emisor` (
  `idmensaje` int(11) NOT NULL,
  `contenido` text,
  `fecha-hora` datetime DEFAULT NULL,
  `estado` varchar(45) DEFAULT NULL,
  `emisor` int(11) NOT NULL,
  `tipo_mensaje_idTipo` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `mensaje_receptor`
--

CREATE TABLE `mensaje_receptor` (
  `idmensaje` int(11) NOT NULL,
  `contenido` text,
  `fecha-hora` datetime DEFAULT NULL,
  `estado` varchar(45) DEFAULT NULL,
  `receptor` int(11) NOT NULL,
  `tipo_mensaje_idTipo` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `ruta`
--

CREATE TABLE `ruta` (
  `idruta` int(11) NOT NULL,
  `nombre` varchar(45) DEFAULT NULL,
  `punto_salida` varchar(45) DEFAULT NULL,
  `punto_llegada` varchar(45) DEFAULT NULL,
  `hora_salida` time DEFAULT NULL,
  `hora_llegada` time DEFAULT NULL,
  `dia_comienzo` date DEFAULT NULL,
  `dia_fin` date DEFAULT NULL,
  `Usuario_idUsuario` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `tipo_mensaje`
--

CREATE TABLE `tipo_mensaje` (
  `idTipo` int(11) NOT NULL,
  `nombre` varchar(45) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `tipo_usuario`
--

CREATE TABLE `tipo_usuario` (
  `idtipo_usuario` int(11) NOT NULL,
  `tipo` varchar(45) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `usuario`
--

CREATE TABLE `usuario` (
  `idUsuario` int(11) NOT NULL,
  `dni` varchar(9) DEFAULT NULL,
  `nombre` varchar(45) DEFAULT NULL,
  `apellidos` varchar(45) DEFAULT NULL,
  `telefono` varchar(9) DEFAULT NULL,
  `fecha_nacimiento` date DEFAULT NULL,
  `foto` 	longtext DEFAULT NULL,
  `carnet` tinyint(4) DEFAULT NULL,
  `estado` varchar(45) DEFAULT NULL,
  `coche` tinyint(4) DEFAULT NULL,
  `login` varchar(45) DEFAULT NULL,
  `password` varchar(45) DEFAULT NULL,
  `email` varchar(45) DEFAULT NULL,
  `tipo_usuario_idtipo_usuario` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `usuario-ubicacion`
--

CREATE TABLE `usuario-ubicacion` (
  `idusuario-ubicacion` int(11) NOT NULL,
  `ubicacion` varchar(45) DEFAULT NULL,
  `Usuario_idUsuario` int(11) NOT NULL,
  `geolocalizacion_idgeolocalizacion` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `busquedas_favoritas`
--
ALTER TABLE `busquedas_favoritas`
  ADD PRIMARY KEY (`id_favorito`),
  ADD KEY `fk_busquedas_favoritas_búsquedas1_idx` (`búsquedas_idbúsquedas`);

--
-- Indices de la tabla `búsquedas`
--
ALTER TABLE `búsquedas`
  ADD PRIMARY KEY (`idbúsquedas`),
  ADD KEY `fk_búsquedas_Usuario1_idx` (`Usuario_idUsuario`);

--
-- Indices de la tabla `carrito-ruta`
--
ALTER TABLE `carrito-ruta`
  ADD PRIMARY KEY (`id`),
  ADD KEY `fk_usuarios-coches-rutas_Usuario1_idx` (`Usuario_idUsuario`),
  ADD KEY `fk_usuarios-coches-rutas_coche1_idx` (`coche_idcoche`),
  ADD KEY `fk_usuarios-coches-rutas_ruta1_idx` (`ruta_idruta`);

--
-- Indices de la tabla `coche`
--
ALTER TABLE `coche`
  ADD PRIMARY KEY (`idcoche`),
  ADD KEY `fk_coche_Usuario1_idx` (`Usuario_idUsuario`);

--
-- Indices de la tabla `geolocalizacion`
--
ALTER TABLE `geolocalizacion`
  ADD PRIMARY KEY (`idgeolocalizacion`),
  `provincia` varchar(150) DEFAULT NULL,
  `poblacion` varchar(150) DEFAULT NULL,
  `cp` varchar(50) DEFAULT NULL,
  `latitud` float DEFAULT NULL,
  `longitud` float DEFAULT NULL,

--
-- Indices de la tabla `mensaje_emisor`
--
ALTER TABLE `mensaje_emisor`
  ADD PRIMARY KEY (`idmensaje`),
  ADD KEY `fk_mensaje_Usuario1_idx` (`emisor`),
  ADD KEY `fk_mensaje_emisor_tipo_mensaje1_idx` (`tipo_mensaje_idTipo`);

--
-- Indices de la tabla `mensaje_receptor`
--
ALTER TABLE `mensaje_receptor`
  ADD PRIMARY KEY (`idmensaje`),
  ADD KEY `fk_mensaje_Usuario1_idx` (`receptor`),
  ADD KEY `fk_mensaje_receptor_tipo_mensaje1_idx` (`tipo_mensaje_idTipo`);

--
-- Indices de la tabla `ruta`
--
ALTER TABLE `ruta`
  ADD PRIMARY KEY (`idruta`),
  ADD KEY `fk_ruta_Usuario1_idx` (`Usuario_idUsuario`);

--
-- Indices de la tabla `tipo_mensaje`
--
ALTER TABLE `tipo_mensaje`
  ADD PRIMARY KEY (`idTipo`);

--
-- Indices de la tabla `tipo_usuario`
--
ALTER TABLE `tipo_usuario`
  ADD PRIMARY KEY (`idtipo_usuario`);

--
-- Indices de la tabla `usuario`
--
ALTER TABLE `usuario`
  ADD PRIMARY KEY (`idUsuario`),
  ADD KEY `fk_Usuario_tipo_usuario1_idx` (`tipo_usuario_idtipo_usuario`);

--
-- Indices de la tabla `usuario-ubicacion`
--
ALTER TABLE `usuario-ubicacion`
  ADD PRIMARY KEY (`idusuario_ubicacion`),
  'ubicacion' varchar(150),
  ADD KEY `fk_usuario-ubicacion_Usuario1_idx` (`Usuario_idUsuario`),
  ADD KEY `fk_usuario-ubicacion_geolocalizacion1_idx` (`geolocalizacion_idgeolocalizacion`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `búsquedas`
--
ALTER TABLE `búsquedas`
  MODIFY `idbúsquedas` int(11) NOT NULL AUTO_INCREMENT,
  'lugar_salida' varchar(100),
  'lugar_llegada' varchar(100),
  'hora_salida' time,
  'hora_llegada' time,
  'fecha' date,
  ADD KEY `fk_búsquedas_usuario` (`Usuario_idUsuario`);


--
-- AUTO_INCREMENT de la tabla `carrito-ruta`
--
ALTER TABLE `carrito-ruta`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `coche`
--
ALTER TABLE `coche`
  MODIFY `idcoche` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `geolocalizacion`
--
ALTER TABLE `geolocalizacion`
  MODIFY `idgeolocalizacion` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `mensaje_emisor`
--
ALTER TABLE `mensaje_emisor`
  MODIFY `idmensaje` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `mensaje_receptor`
--
ALTER TABLE `mensaje_receptor`
  MODIFY `idmensaje` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `ruta`
--
ALTER TABLE `ruta`
  MODIFY `idruta` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `tipo_mensaje`
--
ALTER TABLE `tipo_mensaje`
  MODIFY `idTipo` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `tipo_usuario`
--
ALTER TABLE `tipo_usuario`
  MODIFY `idtipo_usuario` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `usuario`
--
ALTER TABLE `usuario`
  MODIFY `idUsuario` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `usuario-ubicacion`
--
ALTER TABLE `usuario-ubicacion`
  MODIFY `idusuario-ubicacion` int(11) NOT NULL AUTO_INCREMENT;

--
-- Restricciones para tablas volcadas
--

--
-- Filtros para la tabla `busquedas_favoritas`
--
ALTER TABLE `busquedas_favoritas`
  ADD CONSTRAINT `fk_busquedas_favoritas_búsquedas1` FOREIGN KEY (`búsquedas_idbúsquedas`) REFERENCES `búsquedas` (`idbúsquedas`) ON DELETE NO ACTION ON UPDATE NO ACTION;

--
-- Filtros para la tabla `búsquedas`
--
ALTER TABLE `búsquedas`
  ADD CONSTRAINT `fk_búsquedas_Usuario1` FOREIGN KEY (`Usuario_idUsuario`) REFERENCES `usuario` (`idUsuario`) ON DELETE NO ACTION ON UPDATE NO ACTION;

--
-- Filtros para la tabla `carrito-ruta`
--
ALTER TABLE `carrito-ruta`
  ADD CONSTRAINT `fk_usuarios-coches-rutas_Usuario1` FOREIGN KEY (`Usuario_idUsuario`) REFERENCES `usuario` (`idUsuario`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  ADD CONSTRAINT `fk_usuarios-coches-rutas_coche1` FOREIGN KEY (`coche_idcoche`) REFERENCES `coche` (`idcoche`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  ADD CONSTRAINT `fk_usuarios-coches-rutas_ruta1` FOREIGN KEY (`ruta_idruta`) REFERENCES `ruta` (`idruta`) ON DELETE NO ACTION ON UPDATE NO ACTION;

--
-- Filtros para la tabla `coche`
--
ALTER TABLE `coche`
  ADD CONSTRAINT `fk_coche_Usuario1` FOREIGN KEY (`Usuario_idUsuario`) REFERENCES `usuario` (`idUsuario`) ON DELETE NO ACTION ON UPDATE NO ACTION;

--
-- Filtros para la tabla `mensaje_emisor`
--
ALTER TABLE `mensaje_emisor`
  ADD CONSTRAINT `fk_mensaje_Usuario1` FOREIGN KEY (`emisor`) REFERENCES `usuario` (`idUsuario`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  ADD CONSTRAINT `fk_mensaje_emisor_tipo_mensaje1` FOREIGN KEY (`tipo_mensaje_idTipo`) REFERENCES `tipo_mensaje` (`idTipo`) ON DELETE NO ACTION ON UPDATE NO ACTION;

--
-- Filtros para la tabla `mensaje_receptor`
--
ALTER TABLE `mensaje_receptor`
  ADD CONSTRAINT `fk_mensaje_Usuario10` FOREIGN KEY (`receptor`) REFERENCES `usuario` (`idUsuario`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  ADD CONSTRAINT `fk_mensaje_receptor_tipo_mensaje1` FOREIGN KEY (`tipo_mensaje_idTipo`) REFERENCES `tipo_mensaje` (`idTipo`) ON DELETE NO ACTION ON UPDATE NO ACTION;

--
-- Filtros para la tabla `ruta`
--
ALTER TABLE `ruta`
  ADD CONSTRAINT `fk_ruta_Usuario1` FOREIGN KEY (`Usuario_idUsuario`) REFERENCES `usuario` (`idUsuario`) ON DELETE NO ACTION ON UPDATE NO ACTION;

--
-- Filtros para la tabla `usuario`
--
ALTER TABLE `usuario`
  ADD CONSTRAINT `fk_Usuario_tipo_usuario1` FOREIGN KEY (`tipo_usuario_idtipo_usuario`) REFERENCES `tipo_usuario` (`idtipo_usuario`) ON DELETE NO ACTION ON UPDATE NO ACTION;

--
-- Filtros para la tabla `usuario-ubicacion`
--
ALTER TABLE `usuario-ubicacion`
  ADD CONSTRAINT `fk_usuario-ubicacion_Usuario1` FOREIGN KEY (`Usuario_idUsuario`) REFERENCES `usuario` (`idUsuario`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  ADD CONSTRAINT `fk_usuario-ubicacion_geolocalizacion1` FOREIGN KEY (`geolocalizacion_idgeolocalizacion`) REFERENCES `geolocalizacion` (`idgeolocalizacion`) ON DELETE NO ACTION ON UPDATE NO ACTION;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
