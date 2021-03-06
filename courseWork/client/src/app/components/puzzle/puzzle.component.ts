import { Component, OnInit } from '@angular/core';
import { Puzzle } from '../../models/puzzle.model';
import { ActivatedRoute } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Router } from '@angular/router';

import { AuthService } from '../../services/auth/auth.service';
import { ApiPuzzlesService } from '../../services/apiPuzzles/puzzles.service';

import { ConfirmComponent } from '../../modals/confirm-danger/confirm.component';
import { AlertService } from 'src/app/services/alert/alert.service';
import { CartService } from 'src/app/services/apiCarts/cart.service';

@Component({
  selector: 'app-puzzle',
  templateUrl: './puzzle.component.html',
  styleUrls: ['./puzzle.component.css']
})
export class PuzzleComponent implements OnInit {

  puzzle: Puzzle;

  editing = false;

  errorOrNotFound = false;

  constructor(
    public auth: AuthService,
    private route: ActivatedRoute,
    private puzzlesService: ApiPuzzlesService,
    private modalService: NgbModal,
    private router: Router,
    private alerts: AlertService,
    private cartService: CartService
  ) { }

  ngOnInit() {
    const puzzleId = this.route.snapshot.paramMap.get('id');
    this.puzzlesService.getById(puzzleId).subscribe((puzzle: Puzzle) => {
      this.puzzle = puzzle;
    }, (err) => {
      console.log(err);
      this.errorOrNotFound = true;
    });
  }

  confirm() {
    const modalRef = this.modalService.open(ConfirmComponent);
    modalRef.result.then(res => {
      if (res) {
        this.onDelete();
      }
    }, (reason) => {
      console.log(reason);
    });
  }

  onDelete() {
    this.puzzlesService.deleteById(this.puzzle._id).subscribe(res => {
      this.alerts.info('Головоломка удалена');
      this.router.navigate(['/puzzles']);
    }, (err) => {
      console.log(err);
      this.alerts.error('Ошибка удаления, попробуйте позже');
    });
  }

  onBuyClicked() {
    if (!this.auth.isAuthenticated()) {
      this.alerts.info('Только зарегестрированные пользователи могут добавить головоломку в корзину');
      return;
    }  
    this.cartService.insertPuzzle(this.puzzle._id).subscribe((res) => {
      this.alerts.success('Головоломка добвлена в корзину!');
    }, (err) => {
      console.log(err);
      this.alerts.error('Ошибка добавления в корзину. Попробуйте позже');
    });
  }

  onEditClicked() {
    console.log('editing');
    this.editing = true;
    this.router.navigate(['puzzles', 'update', this.puzzle._id],
      {state: { puzzle: this.puzzle }});
  }

  onNotify() {
    this.puzzlesService.subscribe(this.puzzle._id).subscribe(res => {
      if (res) {
        this.alerts.success('Теперь вы получите уведомление в телеграме, когда головоломка появится в начилии');
      }
    }, err => {
      console.log(err);
      this.alerts.error('Ошибка сервера, попробуйте позже');
    })
  }

}
