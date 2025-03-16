import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrManager } from 'ng6-toastr-notifications';
import { EmsService } from 'src/app/service/ems.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  events: any[] = [];
  eventForm!: FormGroup;
  isEditing = false;
  selectedEventId: number | null = null;
  isSubmitted: boolean = false;

  constructor(private eventService: EmsService, private fb: FormBuilder, private toster: ToastrManager) { }

  ngOnInit(): void {
    this.loadEvents();
    this.eventForm = this.fb.group({
      title: ['', Validators.required],
      description: ['', Validators.required],
      date: ['', Validators.required],
      location: ['', Validators.required]
    });
  }

  // Load events
  loadEvents() {
    this.eventService.getEvents().subscribe((data) => {
      this.events = data;
      console.log(this.events, "evee")
    });
  }

  // Add or update event
  submitEvent() {
    this.isSubmitted = true
    if (this.eventForm.valid) {
      const formData = this.eventForm.value;
      if (this.isEditing && this.selectedEventId !== null) {
        formData.id = this.selectedEventId;
        this.eventService.updateEvent(formData).subscribe(() => {
          this.loadEvents();
          this.resetForm();
          this.toster.successToastr('updated event succesfull!')
          this.isSubmitted = false;

        });
      } else {
        this.eventService.addEvent(formData).subscribe(() => {
          this.loadEvents();
          this.resetForm();
          this.toster.successToastr('add event succesfull!');
          this.isSubmitted = false;
        });
      }
    }
  }

  // Edit event
  editEvent(event: any) {
    this.eventForm.patchValue(event);
    this.isEditing = true;
    this.selectedEventId = event.id!;
  }

  // Delete event
  deleteEvent(id: number) {
    this.eventService.deleteEvent(id).subscribe(() => {
      this.loadEvents();
      this.toster.successToastr('Event deleted sucessfull!!')
    });
  }

  // Reset form
  resetForm() {
    this.eventForm.reset();
    this.isEditing = false;
    this.selectedEventId = null;
  }
}


