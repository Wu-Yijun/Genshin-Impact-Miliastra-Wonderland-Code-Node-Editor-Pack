
import { readFileSync } from "fs";
import { decode_gia_file } from "../../protobuf/decode.ts";
import { read_data } from "../data.helper.ts";

const PATH = "C:/Users/admin/AppData/LocalLow/miHoYo/原神/BeyondLocal/Beyond_Local_Export/";
const graph = decode_gia_file(PATH + "1.gia", undefined, true);
const nodes = graph.primary_resource.graph_data?.inner.graph.nodes;

const newNodesPath = "utils/node_data/game_text/nodes.json";
const newNodes = JSON.parse(readFileSync(newNodesPath, "utf-8"));
const oldData = read_data();


const added = newNodes.filter((node: any) => oldData.Nodes.find(n => n.ID === node.id) === undefined);
const server_added = added.filter((x: any) => x.id < 200000);

console.log(server_added);

// enum
// BeyondAssistantEditorConfigGlobal_configEnum_maps_1_mapTitle

// Mini-Map Marker Component
// BeyondAssistantEditorConfigGlobal_folders_0_data_subFolders_0_subFolders_39_name
// BeyondAssistantEditorConfigGlobal_folders_0_data_subFolders_3_subFolders_26_name
// BeyondAssistantEditorConfigGlobal_folders_6_data_subFolders_0_subFolders_33_name
// BeyondAssistantEditorConfigGlobal_folders_6_data_subFolders_3_subFolders_23_name

// Player and Character-Related
// BeyondAssistantEditorConfigGlobal_folders_0_data_subFolders_1_subFolders_5_name
// BeyondAssistantEditorConfigGlobal_folders_0_data_subFolders_3_subFolders_8_name
// BeyondAssistantEditorConfigGlobal_folders_1_data_subFolders_0_subFolders_5_name
// BeyondAssistantEditorConfigGlobal_folders_2_data_subFolders_0_subFolders_5_name
// BeyondAssistantEditorConfigGlobal_folders_7_data_subFolders_0_subFolders_5_name
// BeyondAssistantEditorConfigGlobal_folders_6_data_subFolders_0_subFolders_6_name
// BeyondAssistantEditorConfigGlobal_folders_0_data_subFolders_0_subFolders_7_name
// BeyondAssistantEditorConfigGlobal_folders_6_data_subFolders_3_subFolders_8_name
// BeyondAssistantEditorConfigGlobal_folders_6_data_subFolders_1_subFolders_4_name