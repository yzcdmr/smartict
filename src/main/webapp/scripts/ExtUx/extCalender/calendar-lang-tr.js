/*!
 * Extensible 1.0
 * Copyright(c) 2010-2011 Extensible, LLC
 * licensing@Calendar.akgun.com
 * http://Calendar.akgun.com
 */
/*
 * Default Turkish (TR) locale
 * By Extensible, LLC
 */

Calendar.akgun.Date.use24HourTime = false;

if(Calendar.akgun.cal.CalendarView) {
    Ext.apply(Calendar.akgun.cal.CalendarView.prototype, {
        startDay: 0,
        todayText: 'Bugün',
        defaultEventTitleText: '(Başlık yok)',
        ddCreateEventText: '{0} için olay oluştur',
        ddMoveEventText: 'Olayı {0}\'e taşı',
        ddResizeEventText: 'Olayı {0}\'e güncelle'
    });
}

if(Calendar.akgun.cal.MonthView) {
    Ext.apply(Calendar.akgun.cal.MonthView.prototype, {
        moreText: '+{0} daha fazla...',
        detailsTitleDateFormat: 'F j'
    });
}

if(Calendar.akgun.cal.CalendarPanel) {
    Ext.apply(Calendar.akgun.cal.CalendarPanel.prototype, {
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

if(Calendar.akgun.cal.EventEditWindow) {
    Ext.apply(Calendar.akgun.cal.EventEditWindow.prototype, {
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

if(Calendar.akgun.cal.EventEditForm) {
    Ext.apply(Calendar.akgun.cal.EventEditForm.prototype, {
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

if(Calendar.akgun.cal.DateRangeField) {
    Ext.apply(Calendar.akgun.cal.DateRangeField.prototype, {
        toText: 'to',
        allDayText: 'Tüm Gün'
    });
}

if(Calendar.akgun.cal.CalendarCombo) {
    Ext.apply(Calendar.akgun.cal.CalendarCombo.prototype, {
        fieldLabel: 'Takvim'
    });
}

if(Calendar.akgun.cal.CalendarList) {
    Ext.apply(Calendar.akgun.cal.CalendarList.prototype, {
        title: 'Takvim'
    });
}

if(Calendar.akgun.cal.CalendarListMenu) {
    Ext.apply(Calendar.akgun.cal.CalendarListMenu.prototype, {
        displayOnlyThisCalendarText: 'Display only this calendar'
    });
}

if(Calendar.akgun.cal.RecurrenceCombo) {
    Ext.apply(Calendar.akgun.cal.RecurrenceCombo.prototype, {
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

if(Calendar.akgun.cal.ReminderField) {
    Ext.apply(Calendar.akgun.cal.ReminderField.prototype, {
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

if(Calendar.akgun.cal.DateRangeField) {
    Ext.apply(Calendar.akgun.cal.DateRangeField.prototype, {
        dateFormat: 'd/m/Y'
    });
}

if(Calendar.akgun.cal.EventContextMenu) {
    Ext.apply(Calendar.akgun.cal.EventContextMenu.prototype, {
        editDetailsText: 'Detayları Düzelt',
        deleteText: 'Sil',
        moveToText: 'İlerle...'
    });
}

if(Calendar.akgun.cal.DropZone) {
    Ext.apply(Calendar.akgun.cal.DropZone.prototype, {
        dateRangeFormat: '{0}-{1}',
        dateFormat: 'n/j'
    });
}

if(Calendar.akgun.cal.DayViewDropZone) {
    Ext.apply(Calendar.akgun.cal.DayViewDropZone.prototype, {
        dateRangeFormat: '{0}-{1}',
        dateFormat : 'n/j'
    });
}

if(Calendar.akgun.cal.BoxLayoutTemplate) {
    Ext.apply(Calendar.akgun.cal.BoxLayoutTemplate.prototype, {
        firstWeekDateFormat: 'D j',
        otherWeeksDateFormat: 'j',
        singleDayDateFormat: 'l, F j, Y',
        multiDayFirstDayFormat: 'M j, Y',
        multiDayMonthStartFormat: 'M j'
    });
}

if(Calendar.akgun.cal.MonthViewTemplate) {
    Ext.apply(Calendar.akgun.cal.MonthViewTemplate.prototype, {
        dayHeaderFormat: 'D',
        dayHeaderTitleFormat: 'l, F j, Y'
    });
}
