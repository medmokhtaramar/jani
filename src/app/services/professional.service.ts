import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ProfessionalService {
  private apiUrl = 'http://45.147.97.250:5080'; // URL de ton API

  constructor() {}

  // 🔹 GET : Tous les professionnels
  async getAllProfessionals(): Promise<any[]> {
    try {
      const response = await fetch(`professionals`);


      if (!response.ok) {
        throw new Error('Failed to fetch professionals');
      }

      const data = await response.json();
      return data; // Renvoie les données récupérées
    } catch (error) {
      throw error; // Lance l'erreur en cas de problème
    }
  }

  // 🔹 GET : Par ID
  async getProfessionalById(id: number): Promise<any> {
    try {
      const response = await fetch(`professionals/${id}`);

      if (!response.ok) {
        throw new Error('Failed to fetch professional');
      }

      const data = await response.json();
      return data; // Renvoie les données du professionnel par ID
    } catch (error) {
      throw error; // Lance l'erreur en cas de problème
    }
  }

  // 🔹 PUT : Mettre à jour un professionnel
  async updateProfessional(id: number, data: any): Promise<any> {
    try {
      const response = await fetch(`professionals/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error('Failed to update professional');
      }

      const updatedData = await response.json();
      return updatedData; // Renvoie les données mises à jour
    } catch (error) {
      throw error; // Lance l'erreur en cas de problème
    }
  }
}
