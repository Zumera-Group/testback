export class EnvironmentService {
  static isProduction() {
    return process.env.NODE_ENV === 'production';
  }
}
