package com.company.jwr_monitoring.plc;

import java.time.LocalDateTime;

import org.apache.plc4x.java.api.PlcConnection;
import org.springframework.stereotype.Service;
import com.company.jwr_monitoring.dto.TagLog.TagLogDto;
import com.company.jwr_monitoring.entity.TagMaster;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Service
@RequiredArgsConstructor
@Slf4j
public class PlcReadService {
        private final PlcConnectionService plcConnectionService;

        public TagLogDto readTag(TagMaster tag) {
                PlcConnection connection = null;
                try {
                        connection = plcConnectionService.getConnection(tag.getIpAddress(), tag.getPort());
                        Double value = switch (tag.getParameter().getType()) {
                                case INT -> readInt(connection, tag.getRegisterAddress());
                                case REAL -> readReal(connection, tag.getRegisterAddress());
                                case BOOL -> readBool(connection, tag.getRegisterAddress());
                        };
                        return new TagLogDto(tag.getId(), tag.getTagName(), value,
                                        LocalDateTime.now().withSecond(0).withNano(0));

                } catch (Exception ex) {
                        plcConnectionService.invalidateConnection(tag.getIpAddress(), tag.getPort());
                        log.error("PLC Read Failed | Tag={} | Register={} | Error={}",
                                        tag.getTagName(),
                                        tag.getRegisterAddress(),
                                        ex.getMessage());
                        return null;
                }
        }

        private Double readInt(PlcConnection connection, int registerAddress) throws Exception {
                int modbusAddress = registerAddress - 40000;
                var response = connection
                                .readRequestBuilder()
                                .addTagAddress("value", "holding-register:" + modbusAddress + ":INT")
                                .build()
                                .execute()
                                .get();

                return response.getInteger("value").doubleValue();
        }

        private Double readReal(PlcConnection connection, int registerAddress) throws Exception {
                int modbusAddress = registerAddress - 40000;
                var response = connection.readRequestBuilder()
                                .addTagAddress("r1", "holding-register:" + modbusAddress)
                                .addTagAddress("r2", "holding-register:" + (modbusAddress + 1))
                                .build()
                                .execute()
                                .get();

                int r1 = response.getShort("r1") & 0xFFFF;
                int r2 = response.getShort("r2") & 0xFFFF;
                float value = Float.intBitsToFloat((r2 << 16) | r1);
                return (double) value;
        }

        private Double readBool(PlcConnection connection, int registerAddress) throws Exception {
                var response = connection
                                .readRequestBuilder()
                                .addTagAddress("value", "coil:" + registerAddress + ":BOOL")
                                .build()
                                .execute()
                                .get();
                return response.getBoolean("value") ? 1.0 : 0.0;
        }
}