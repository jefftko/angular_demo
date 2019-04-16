/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
import Calendar from './calendar/sl_SI';
import DatePicker from './date-picker/sl_SI';
import Pagination from './pagination/sl_SI';
import TimePicker from './time-picker/sl_SI';
export default {
    locale: 'sl',
    Pagination,
    DatePicker,
    TimePicker,
    Calendar,
    Table: {
        filterTitle: 'Filter',
        filterConfirm: 'Potrdi',
        filterReset: 'Ponastavi',
        emptyText: 'Ni podataka',
        selectAll: 'Izberi trenutno stran',
        selectInvert: 'Obrni vrstni red izbora',
    },
    Modal: {
        okText: 'V redu',
        cancelText: 'Prekliči',
        justOkText: 'V redu',
    },
    Popconfirm: {
        okText: 'V redu',
        cancelText: 'Prekliči',
    },
    Transfer: {
        notFoundContent: 'Ni zadetkov',
        searchPlaceholder: 'Išči tukaj',
        itemUnit: 'vnos',
        itemsUnit: 'vnosi',
    },
    Select: {
        notFoundContent: 'Ni zadetkov',
    },
    Upload: {
        uploading: 'Nalaganje...',
        removeFile: 'Odstrani datoteko',
        uploadError: 'Napaka pri nalaganju',
        previewFile: 'Predogled datoteke',
    },
};

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2xfU0kuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9uZy16b3Jyby1hbnRkLyIsInNvdXJjZXMiOlsiaTE4bi9sYW5ndWFnZXMvc2xfU0kudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUFBLE9BQU8sUUFBUSxNQUFNLGtCQUFrQixDQUFDO0FBQ3hDLE9BQU8sVUFBVSxNQUFNLHFCQUFxQixDQUFDO0FBQzdDLE9BQU8sVUFBVSxNQUFNLG9CQUFvQixDQUFDO0FBQzVDLE9BQU8sVUFBVSxNQUFNLHFCQUFxQixDQUFDO0FBRTdDLGVBQWU7SUFDYixNQUFNLEVBQUUsSUFBSTtJQUNaLFVBQVU7SUFDVixVQUFVO0lBQ1YsVUFBVTtJQUNWLFFBQVE7SUFDUixLQUFLLEVBQUU7UUFDTCxXQUFXLEVBQUUsUUFBUTtRQUNyQixhQUFhLEVBQUUsUUFBUTtRQUN2QixXQUFXLEVBQUUsV0FBVztRQUN4QixTQUFTLEVBQUUsYUFBYTtRQUN4QixTQUFTLEVBQUUsdUJBQXVCO1FBQ2xDLFlBQVksRUFBRSx5QkFBeUI7S0FDeEM7SUFDRCxLQUFLLEVBQUU7UUFDTCxNQUFNLEVBQUUsUUFBUTtRQUNoQixVQUFVLEVBQUUsVUFBVTtRQUN0QixVQUFVLEVBQUUsUUFBUTtLQUNyQjtJQUNELFVBQVUsRUFBRTtRQUNWLE1BQU0sRUFBRSxRQUFRO1FBQ2hCLFVBQVUsRUFBRSxVQUFVO0tBQ3ZCO0lBQ0QsUUFBUSxFQUFFO1FBQ1IsZUFBZSxFQUFFLGFBQWE7UUFDOUIsaUJBQWlCLEVBQUUsWUFBWTtRQUMvQixRQUFRLEVBQUUsTUFBTTtRQUNoQixTQUFTLEVBQUUsT0FBTztLQUNuQjtJQUNELE1BQU0sRUFBRTtRQUNOLGVBQWUsRUFBRSxhQUFhO0tBQy9CO0lBQ0QsTUFBTSxFQUFFO1FBQ04sU0FBUyxFQUFFLGNBQWM7UUFDekIsVUFBVSxFQUFFLG1CQUFtQjtRQUMvQixXQUFXLEVBQUUsc0JBQXNCO1FBQ25DLFdBQVcsRUFBRSxvQkFBb0I7S0FDbEM7Q0FDRixDQUFDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IENhbGVuZGFyIGZyb20gJy4vY2FsZW5kYXIvc2xfU0knO1xuaW1wb3J0IERhdGVQaWNrZXIgZnJvbSAnLi9kYXRlLXBpY2tlci9zbF9TSSc7XG5pbXBvcnQgUGFnaW5hdGlvbiBmcm9tICcuL3BhZ2luYXRpb24vc2xfU0knO1xuaW1wb3J0IFRpbWVQaWNrZXIgZnJvbSAnLi90aW1lLXBpY2tlci9zbF9TSSc7XG5cbmV4cG9ydCBkZWZhdWx0IHtcbiAgbG9jYWxlOiAnc2wnLFxuICBQYWdpbmF0aW9uLFxuICBEYXRlUGlja2VyLFxuICBUaW1lUGlja2VyLFxuICBDYWxlbmRhcixcbiAgVGFibGU6IHtcbiAgICBmaWx0ZXJUaXRsZTogJ0ZpbHRlcicsXG4gICAgZmlsdGVyQ29uZmlybTogJ1BvdHJkaScsXG4gICAgZmlsdGVyUmVzZXQ6ICdQb25hc3RhdmknLFxuICAgIGVtcHR5VGV4dDogJ05pIHBvZGF0YWthJyxcbiAgICBzZWxlY3RBbGw6ICdJemJlcmkgdHJlbnV0bm8gc3RyYW4nLFxuICAgIHNlbGVjdEludmVydDogJ09icm5pIHZyc3RuaSByZWQgaXpib3JhJyxcbiAgfSxcbiAgTW9kYWw6IHtcbiAgICBva1RleHQ6ICdWIHJlZHUnLFxuICAgIGNhbmNlbFRleHQ6ICdQcmVrbGnEjWknLFxuICAgIGp1c3RPa1RleHQ6ICdWIHJlZHUnLFxuICB9LFxuICBQb3Bjb25maXJtOiB7XG4gICAgb2tUZXh0OiAnViByZWR1JyxcbiAgICBjYW5jZWxUZXh0OiAnUHJla2xpxI1pJyxcbiAgfSxcbiAgVHJhbnNmZXI6IHtcbiAgICBub3RGb3VuZENvbnRlbnQ6ICdOaSB6YWRldGtvdicsXG4gICAgc2VhcmNoUGxhY2Vob2xkZXI6ICdJxaHEjWkgdHVrYWonLFxuICAgIGl0ZW1Vbml0OiAndm5vcycsXG4gICAgaXRlbXNVbml0OiAndm5vc2knLFxuICB9LFxuICBTZWxlY3Q6IHtcbiAgICBub3RGb3VuZENvbnRlbnQ6ICdOaSB6YWRldGtvdicsXG4gIH0sXG4gIFVwbG9hZDoge1xuICAgIHVwbG9hZGluZzogJ05hbGFnYW5qZS4uLicsXG4gICAgcmVtb3ZlRmlsZTogJ09kc3RyYW5pIGRhdG90ZWtvJyxcbiAgICB1cGxvYWRFcnJvcjogJ05hcGFrYSBwcmkgbmFsYWdhbmp1JyxcbiAgICBwcmV2aWV3RmlsZTogJ1ByZWRvZ2xlZCBkYXRvdGVrZScsXG4gIH0sXG59O1xuIl19