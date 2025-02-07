use escpos::driver::*;
use escpos::printer::Printer as EscPosPrinter;
use escpos::printer_options::PrinterOptions;
use escpos::errors::PrinterError;
use escpos::errors::Result;
use escpos::utils::*;
use printers::common::base::printer::Printer;
use printers::common::base::printer::PrinterState;
use printers::get_default_printer as printers_get_default_printer;
use printers::get_printer_by_name as printers_get_printer_by_name;
use printers::get_printers as printers_get_printers;
use rusb::Device;
use rusb::GlobalContext;
use serde_json::json;
use serde_json::Value;
use usb_ids::Vendor;
use usb_ids::FromId;
use usb_ids::Device as UsbIdsDevice;

fn format_printer_state(printer_state: PrinterState) -> String {
    return match printer_state {
        PrinterState::READY => "ready".to_owned(),
        PrinterState::PAUSED => "paused".to_owned(),
        PrinterState::PRINTING => "printing".to_owned(),
        PrinterState::UNKNOWN => "unknown".to_owned(),
    };
}

fn format_printer(printer: Option<Printer>) -> Value {
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

fn format_escpos_printer_state(printer_state: PrinterState) -> String {
    return match printer_state {
        PrinterState::READY => "ready".to_owned(),
        PrinterState::PAUSED => "paused".to_owned(),
        PrinterState::PRINTING => "printing".to_owned(),
        PrinterState::UNKNOWN => "unknown".to_owned(),
    };
}

#[tauri::command]
fn get_printers() -> Vec<serde_json::Value> {
    printers_get_printers()
        .iter()
        .map(|x| format_printer(Some(x.to_owned())))
        .collect()
}

fn format_new_printer(device: Device<GlobalContext>) -> Value {
    let device_desc = device.device_descriptor().unwrap();

    let vendor_name = match Vendor::from_id(device_desc.vendor_id()) {
      Some(vendor) => vendor.name(),
      None => "Unknown vendor",
  };

  let product_name =
      match UsbIdsDevice::from_vid_pid(device_desc.vendor_id(), device_desc.product_id()) {
          Some(product) => product.name(),
          None => "Unknown product",
      };

    return json!({
      "product_name": product_name,
      "vendor_name": vendor_name,
      "bus_number": device.bus_number(),
      "address": device.address(),
      "vendor_id": device_desc.vendor_id(),
      "product_id": device_desc.product_id(),
    });
}

#[tauri::command]
fn list_devices_new() -> Vec<serde_json::Value> {
    return rusb::devices()
        .unwrap()
        .iter()
        .map(|x| format_new_printer(x))
        .collect();
}


fn print_rust_text()-> Result<()> {
    // let my_printer = printers_get_printer_by_name("EPSON TM-T88IV ReceiptE4");
    // my_printer.unwrap().print("test".as_bytes(), Some("My Job"));

    // USBPRINT\EPSONL3110_SERIES\7&6832F64&0&USB001

    println!("Test");
    // let driver = UsbDriver::open(
    //     1208 as u16,
    //     514 as u16,
    //      None,
    // )?;
    println!("Test 2");

    // EscPosPrinter::new(driver, Protocol::default(), Some(PrinterOptions::default()))
    //      .debug_mode(Some(DebugMode::Dec))
    //      .init()?
    //      .writeln("Native USB test")?
    //      .print_cut()?;
        //  .smoothing(true)?
        //  .bold(true)?
        //  .underline(UnderlineMode::Single)?
        //  .writeln("Bold underline")?
        //  .justify(JustifyMode::CENTER)?
        //  .reverse(true)?
        //  .bold(false)?
        //  .writeln("Hello world - Reverse")?
        //  .feed()?
        //  .justify(JustifyMode::RIGHT)?
        //  .reverse(false)?
        //  .underline(UnderlineMode::None)?
        //  .size(2, 3)?
        //  .writeln("Hello world - Normal")?
        //  .print_cut();

        println!("Test 3");
         Ok(())
}

#[tauri::command]
fn print_text() {
    print_rust_text();
}

#[cfg_attr(mobile, tauri::mobile_entry_point)]
pub fn run() {
    tauri::Builder::default()
        .invoke_handler(tauri::generate_handler![
            get_printer_by_name,
            get_default_printer,
            get_printers,
            print_text,
            list_devices_new
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
