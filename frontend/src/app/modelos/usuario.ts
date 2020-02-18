export interface UsuarioModelo {
    idUsuario?: number;
    dni?: string;
    nombre?: string;
    apellidos?: string;
    telefono?: string;
    fecha_nacimiento?: Date;
    foto?: string;
    carnet?: boolean;
    estado?: string;
    coche?: boolean;
    login?: string;
    password?: string;
    email?: string;
    tipo_usuario_idtipo_usuario?: number;
}