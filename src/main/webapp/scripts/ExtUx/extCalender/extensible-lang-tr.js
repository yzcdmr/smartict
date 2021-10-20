/*!
 * Extensible 1.0
 * Copyright(c) 2010-2011 Extensible, LLC
 * licensing@ext.ensible.com
 * http://ext.ensible.com
 */
/*
 * Default Turkish (TR) locale
 * By Extensible, LLC
 */

//Ext.ensible.Date.use24HourTime = false;

if(Ext.ensible.cal.CalendarView) {
    Ext.apply(Ext.ensible.cal.CalendarView.prototype, {
        startDay: 0,
        todayText: 'Bugün',
        defaultEventTitleText: '(Başlık yok)',
        ddCreateEventText: '{0} için olay oluştur',
        ddMoveEventText: 'Olayı {0}\'e taşı',
        ddResizeEventText: 'Olayı {0}\'e güncelle'
    });
}

if(Ext.ensible.cal.MonthView) {
    Ext.apply(Ext.ensible.cal.MonthView.prototype, {
        moreText: '+{0} daha fazla...',
        detailsTitleDateFormat: 'F j'
    });
}

if(Ext.ensible.cal.CalendarPanel) {
    Ext.apply(Ext.ensible.cal.CalendarPanel.prototype, {
        todayText: 'Bugün',
        dayText: 'Gün',
        weekText: 'Hafta',
        monthText: 'Ay',
        jumpToText: 'Atla:',
        goText: 'Git',
        multiDayText: '{0} Gün',
        multiWeekText: '{0} Hafta'
    });
}

if(Ext.ensible.cal.EventEditWindow) {
    Ext.apply(Ext.ensible.cal.EventEditWindow.prototype, {
        width: 600,
        labelWidth: 65,
        titleTextAdd: 'Ekle',
        titleTextEdit: 'Düzelt',
        savingMessage: 'Veriler kaydediliyor...',
        deletingMessage: 'Veriler siliniyor...',
        detailsLinkText: 'Detayları Düzenle...',
        saveButtonText: 'Kaydet',
        deleteButtonText: 'Sil',
        cancelButtonText: 'İptal',
        titleLabelText: 'Başlık',
        datesLabelText: 'Ne zaman',
        calendarLabelText: 'Takvim'
    });
}

if(Ext.ensible.cal.EventEditForm) {
    Ext.apply(Ext.ensible.cal.EventEditForm.prototype, {
        labelWidth: 65,
        labelWidthRightCol: 65,
        title: 'Olay Form',
        titleTextAdd: 'Ekle',
        titleTextEdit: 'Düzelt',
        saveButtonText: 'Kaydet',
        deleteButtonText: 'Sil',
        cancelButtonText: 'İptal',
        titleLabelText: 'Başlık',
        datesLabelText: 'Ne zaman',
        reminderLabelText: 'Hatırlatma',
        notesLabelText: 'Notlar',
        locationLabelText: 'Yer',
        webLinkLabelText: 'Web Link',
        calendarLabelText: 'Takvim',
        repeatsLabelText: 'Tekrar'
    });
}

if(Ext.ensible.cal.DateRangeField) {
    Ext.apply(Ext.ensible.cal.DateRangeField.prototype, {
        toText: 'to',
        allDayText: 'Tüm Gün'
    });
}

if(Ext.ensible.cal.CalendarCombo) {
    Ext.apply(Ext.ensible.cal.CalendarCombo.prototype, {
        fieldLabel: 'Takvim'
    });
}

if(Ext.ensible.cal.CalendarList) {
    Ext.apply(Ext.ensible.cal.CalendarList.prototype, {
        title: 'Takvim'
    });
}

if(Ext.ensible.cal.CalendarListMenu) {
    Ext.apply(Ext.ensible.cal.CalendarListMenu.prototype, {
        displayOnlyThisCalendarText: 'Display only this calendar'
    });
}

if(Ext.ensible.cal.RecurrenceCombo) {
    Ext.apply(Ext.ensible.cal.RecurrenceCombo.prototype, {
        fieldLabel: 'Tekrarlar',
        recurrenceText: {
            none: 'Tekrarlamıyor',
            daily: 'Günlük',
            weekly: 'Haftalık',
            monthly: 'Aylık',
            yearly: 'Yıllık'
        }
    });
}

if(Ext.ensible.cal.ReminderField) {
    Ext.apply(Ext.ensible.cal.ReminderField.prototype, {
        fieldLabel: 'Hatırlatıcı',
        noneText: 'Hiçbiri',
        atStartTimeText: 'Başlangıç Zamanı',
        minutesText: 'dakika',
        hourText: 'saat',
        hoursText: 'saat',
        dayText: 'gün',
        daysText: 'gün',
        weekText: 'hafta',
        weeksText: 'hafta',
        reminderValueFormat: '{0} {1} (başlangıçtan önce)' // e.g. "2 hours before start"
    });
}

if(Ext.ensible.cal.DateRangeField) {
    Ext.apply(Ext.ensible.cal.DateRangeField.prototype, {
        dateFormat: 'd/m/Y'
    });
}

if(Ext.ensible.cal.EventContextMenu) {
    Ext.apply(Ext.ensible.cal.EventContextMenu.prototype, {
        editDetailsText: 'Detayları Düzelt',
        deleteText: 'Sil',
        moveToText: 'İlerle...'
    });
}

if(Ext.ensible.cal.DropZone) {
    Ext.apply(Ext.ensible.cal.DropZone.prototype, {
        dateRangeFormat: '{0}-{1}',
        dateFormat: 'n/j'
    });
}

if(Ext.ensible.cal.DayViewDropZone) {
    Ext.apply(Ext.ensible.cal.DayViewDropZone.prototype, {
        dateRangeFormat: '{0}-{1}',
        dateFormat : 'n/j'
    });
}

if(Ext.ensible.cal.BoxLayoutTemplate) {
    Ext.apply(Ext.ensible.cal.BoxLayoutTemplate.prototype, {
        firstWeekDateFormat: 'D j',
        otherWeeksDateFormat: 'j',
        singleDayDateFormat: 'l, F j, Y',
        multiDayFirstDayFormat: 'M j, Y',
        multiDayMonthStartFormat: 'M j'
    });
}

if(Ext.ensible.cal.MonthViewTemplate) {
    Ext.apply(Ext.ensible.cal.MonthViewTemplate.prototype, {
        dayHeaderFormat: 'D',
        dayHeaderTitleFormat: 'l, F j, Y'
    });
}
