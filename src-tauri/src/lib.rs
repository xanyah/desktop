use printers::common::base::printer::PrinterState;
use printers::get_default_printer as printers_get_default_printer;
use printers::get_printer_by_name as printers_get_printer_by_name;
use printers::get_printers as printers_get_printers;
use printers::common::base::printer::Printer;
use serde_json::json;
use serde_json::Value;

fn format_printer_state(printer_state: PrinterState) -> String {
  return match printer_state{
    PrinterState::READY=>"ready".to_owned(),
    PrinterState::PAUSED=>"paused".to_owned(),
    PrinterState::PRINTING=>"printing".to_owned(),
    PrinterState::UNKNOWN=>"unknown".to_owned(),
   };
}

fn format_printer(printer: Option<Printer>)-> Value {
  if printer.is_some() {
    let unwrapped_printer = printer.unwrap();
    return json!({
      "name": unwrapped_printer.name,
      "system_name": unwrapped_printer.system_name,
      "driver_name": unwrapped_printer.driver_name,
      "uri": unwrapped_printer.uri,
      "port_name": unwrapped_printer.port_name,
      "processor": unwrapped_printer.processor,
      "data_type": unwrapped_printer.data_type,
      "description": unwrapped_printer.description,
      "location": unwrapped_printer.location,
      "is_default": unwrapped_printer.is_default,
      "is_shared": unwrapped_printer.is_shared,
      "state": format_printer_state(unwrapped_printer.state),
    });
  } else {
    return json!(false);
  }
}

#[tauri::command]
fn get_printer_by_name(name: String) -> Value {
  return format_printer(printers_get_printer_by_name(&name));
}

#[tauri::command]
fn get_default_printer() -> Value {
  return format_printer(printers_get_default_printer());
}

#[tauri::command]
fn get_printers() -> Vec<serde_json::Value> {
    printers_get_printers()
        .iter()
        .map(|x| format_printer(Some(x.to_owned())))
        .collect()
}


#[tauri::command]
fn print_text() {
  let my_printer = printers_get_printer_by_name("HP Color LaserJet Pro MFP M177fw");
  my_printer.unwrap().print("test".as_bytes(), Some("My Job"));

}


#[cfg_attr(mobile, tauri::mobile_entry_point)]
pub fn run() {
  tauri::Builder::default()
    .invoke_handler(tauri::generate_handler![
      get_printer_by_name,
      get_default_printer,
      get_printers,
      print_text
    ])
    .setup(|app| {
      if cfg!(debug_assertions) {
        app.handle().plugin(
          tauri_plugin_log::Builder::default()
            .level(log::LevelFilter::Info)
            .build(),
        )?;
      }
      Ok(())
    })
    .plugin(tauri_plugin_printer::init())
    .run(tauri::generate_context!())
    .expect("error while running tauri application");
}
