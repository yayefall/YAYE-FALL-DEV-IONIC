export interface Users{
  id: number;
  nom: string;
  prenom: string;
  username: string;
  password: string;
  photo: string;
  email: string;
  telephone: string;
  token: string;
  profils:
    {
      libelle: string;
    };
}
