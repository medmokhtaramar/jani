import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProfessionalService } from '../services/professional.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-professional',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './professional.component.html',
  styleUrls: ['./professional.component.css']
})
export class ProfessionalComponent implements OnInit {
  professionals: any[] = [];
  selectedProfessional: any = null;

  constructor(
    private professionalService: ProfessionalService,
    private cdr: ChangeDetectorRef // 👉 injection du ChangeDetectorRef ici
  ) {}

  ngOnInit(): void {
    this.chargerProfessionnels();
  }

  async chargerProfessionnels() {
    try {
      const data = await this.professionalService.getAllProfessionals();
      this.professionals = data;
      this.cdr.detectChanges(); // 👈 forcer Angular à rafraîchir la vue
      console.log('Liste des professionnels :', this.professionals);
    } catch (error) {
      console.error('Erreur lors de la récupération des professionnels :', error);
    }
  }

  modifier(professionnel: any) {
    this.selectedProfessional = { ...professionnel };
    const modal = new (window as any).bootstrap.Modal(
      document.getElementById('modifierModal')
    );
    modal.show();
  }

  async validerModification() {
    try {
      await this.professionalService.updateProfessional(this.selectedProfessional.id, this.selectedProfessional);
      alert('Professionnel mis à jour avec succès');
      this.selectedProfessional = null;
      await this.chargerProfessionnels();
    } catch (error) {
      console.error('Erreur lors de la mise à jour :', error);
      alert('Erreur lors de la mise à jour');
    }
  }

  annuler() {
    this.selectedProfessional = null;
  }
}
